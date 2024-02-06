let q = require("q");
let objectid = require('bson').ObjectID
let ObjectId = require('mongodb').ObjectID;
var request = require('request')
let redisClient = require('../config/redis');
let applications = require("./../models/application");
let botCollection = require("./../models/bots");
let triggerCollection = require("./../models/triggers");
let user = require("./../models/users")
let addon = require("./../models/addons")
let storyMetaCollection = require("./../models/storymeta")
const { getPackageByType } = require('./../services/packageService');
var constants = require("./../config/constants");
var environment = constants.SERVER_ENV
let redishHelper = {
    getApplicationList: function (userId) {
        console.log("calling application list")
        let defer = q.defer();
        try {
            redisClient.getByKey("applicationList_" + userId).then(function (applicationList) {
                console.log("applicationList_")
                defer.resolve(applicationList);
            })
        } catch (err) {
            console.log(err);
        }
        return defer.promise;
    },
    setApplicationList: function (userId, applicationsList) {
        redisClient.setBykey("applicationList_" + userId, applicationsList);
    },
}

let applicationsList = function (userId, appId) {
    this.userId = userId;
    this.appId = appId;
};
applicationsList.prototype.getFilterApplication = function () {
    let defer = q.defer();
    let self = this;
    if (this.userId) {

        if (true) {
            applications.find({ users: { "$elemMatch": { user_id: ObjectId(self.userId) } } }).then((applicationDef) => {
                console.log(applicationDef);
                if (applicationDef) {
                    redishHelper.setApplicationList(self.userId, applicationDef);
                    defer.resolve(applicationDef);
                } else {
                    defer.resolve();
                }
            })
        } else {
            defer.resolve(applicationsList);
        }
        // })

    } else {
        console.log("filter users")
        defer.resolve();
    }
    return defer.promise;
};

applicationsList.prototype.updateApplication = function (integrationObj) {
    let defer = q.defer();
    let self = this;
    // if (this.userId) {
    console.log(this.appId);
    applications.findOneAndUpdate({ _id: ObjectId(this.appId) }, { "$set": integrationObj }).then(updatedApplication => {
        redisClient.del(`${environment}:app_${this.appId}`);

        defer.resolve(updatedApplication)
    })


    return defer.promise;
};

applicationsList.prototype.getAppDetail = function () {
    let defer = q.defer();
    let self = this;

    applications.find({ "_id": ObjectId(this.appId) }).then((applicationDef) => {
        defer.resolve(applicationDef);
    })
    return defer.promise;
};
applicationsList.prototype.getInstalledModules = function () {
    let defer = q.defer();
    let self = this;

    applications.findOne({ "_id": ObjectId(this.appId) }).then((applicationDef) => {
        defer.resolve(applicationDef);
    })
    return defer.promise;
};
applicationsList.prototype.getIntegrationConfig = function (integration) {
    let defer = q.defer();
    try {
        applications.findOne({ "_id": ObjectId(this.appId) }, { integration: 1 }).then((applicationDef) => {
            // console.log(applicationDef);
            defer.resolve(JSON.parse(JSON.stringify(applicationDef)).integration[integration]);
        })
    } catch (error) {
        console.log(error);
    }

    return defer.promise;
};
applicationsList.prototype.addBotToApplication = function (bot) {
    return new Promise((resolve, reject) => {
        applications.updateOne({ "_id": ObjectId(this.appId) }, { $push: { "bots": bot } }).then((applicationDef) => {
            redisClient.del(`${environment}:app_${this.appId}`);
            resolve(applicationDef);

        })
    })


};
applicationsList.prototype.addMultiToApplication = function (bot) {
    let defer = q.defer();
    let self = this;
    applications.update({ "_id": ObjectId(this.appId) }, { $push: { "multi_bots": bot } }).then((applicationDef) => {

        defer.resolve(applicationDef);

    })
    return defer.promise;

};

applicationsList.prototype.verifyAndGetAppDetailForUser = function () {

    let defer = q.defer();
    applications.find({ "_id": ObjectId(this.appId), users: { "$elemMatch": { user_id: this.userId } } }).then((applicationDef) => {
        //  console.log(applicationDef);
        if (applicationDef) {
            defer.resolve(applicationDef);
        } else {
            defer.resolve();
        }
    })
    return defer.promise;
};
applicationsList.prototype.getListOfAppForUser = function () {
    let defer = q.defer();
    applications.find({ users: { "$elemMatch": { user_id: ObjectId(this.userId) } } }).then((listOfApp) => {
        listOfApp = JSON.parse(JSON.stringify(listOfApp));
        //defer.resolve(listOfApp);
        let list = []
        if (listOfApp) {
            listOfApp.forEach(value => {
                value.users.forEach(user => user.user_id = user.user_id + '')
                value.bots.forEach(bot => bot.bot_id = bot.bot_id + '')
                if (value.hasOwnProperty("sideMenu")) {
                    value.sideMenu.forEach(sideMenu => sideMenu.bot_id = sideMenu.bot_id + '')
                }
                if (value.hasOwnProperty("defaultBot")) {
                    value.defaultBot._id = value.defaultBot._id + ''
                }
                value._id = value._id + '';
                list.push(value)
            })
            defer.resolve(list);
        } else {
            defer.resolve();
        }
    })
    return defer.promise;
};

applicationsList.prototype.createDefaultBotCopy = function () {
    let defer = q.defer();
    let role = "owner";
    let botId = "57ac739351977e4d008b4568";
    let triggersList = [{
        'name': 'get_contact_detail',
        'id': '57ac73c051977e4d008b4569'
    }]
    let botData

    botCollection.find({ "_id": ObjectId(this.userId) }).then(bot => {
        if (!bot) defer.resolve(false)
        botData = bot;

        let userObj;
        let userArray = []

        user.findOne({ "_id": ObjectId(this.userId) }).then(userData => {
            console.log("usercollection")
            userObj = userData
            userArray.push({ "user_id": this.userId })
            userArray.push({ "created_at": new Date() })
            userArray.push({ "role": role })
            if (userObj.hasOwnProperty("username"))
                userArray.push({ "username": userObj.username })
            else
                userArray.push({ "username": "" })

            botData['users'] = userArray;
            botData['public'] = 0;
            botData['_id'] = new objectid();

            let bot1 = new botCollection(botData)
            bot1.save(function (error, result) {
                if (error) console.log(error)
            })

            let triggerFinal
            let data = []
            triggersList.forEach(trigger => {
                this.copyTriggerForBot(trigger.id, botData._id).then(final => {
                    triggerFinal = {
                        "trigger": {
                            "name": final._id,
                            "id": trigger.id
                        }
                    }
                    storyMetaCollection.findOne({ "bot_id": ObjectId(botId) }).then(botStoryMeta => {
                        if (botStoryMeta) {
                            console.log("bot stroty meta")
                            botStoryMeta['bot_id'] = new objectid();
                            let story = new storyMetaCollection(botStoryMeta)
                            story.save(function (error, result) {
                                if (error) throw error
                                if (result) defer.resolve({ "botData": botData, "triggerData": triggerFinal })
                            })

                        }
                    })
                })
            })

        })
    })




    return defer.promise
}
applicationsList.prototype.copyTriggerForBot = function (triggerId, botId) {
    let defer = q.defer();
    let botTrigger;
    triggerCollection.findOne({ "_id": ObjectId(triggerId) }).then(trigger => {
        botTrigger = trigger
        botTrigger['bot_id'] = ObjectId(botId)
        let triggerCollectionc = new triggerCollection(botTrigger)
        triggerCollectionc.save(function (error, result) {
            if (error) console.log(error)
            if (result) {
                defer.resolve(botTrigger)
            }
        })
    })
    return defer.promise
}
applicationsList.prototype.addNewAppForUserId = async function (name, desc, img, category, tags, public, userId, defaultBotConfig, defaultBot, installedModule) {
    debugger
    console.log("addNewAppForUserId")
    let defer = q.defer();
    let repository = 'owner'
    let role = "owner"
    let userObj;
    // user.findOne({ "_id": ObjectId(this.userId) }).then(userData => {
    // userObj = userData
    let object = {
        "_id": new objectid(),
        "name": name,
        "description": desc,
        "image_url": img,
        "users": [{
            "user_id": this.userId,
            "created_at": Date.now(),
            "role": role,
        }],
        "menus": [],
        "bots": [],
        "public": public,
        "tags": (tags == null) ? [] : tags,
        "category": category,
        "repository": repository,
        'created_on': new Date(),
        "installedModules": [],
        "default_module": [{
            "bot_id": defaultBot['_id'],
            "features": defaultBotConfig
        }],
        "userProperties": [
            {
                "name": "Name",
                "variable": "data.name",
                "type": "string"
            },
            {
                "name": "Email",
                "variable": "data.email",
                "type": "string"
            },
            {
                "name": "Mobile",
                "variable": "data.mobile",
                "type": "string"
            },
            {
                "name": "Integraton",
                "variable": "data.integration",
                "type": "string"
            }
        ],
        "systemProperties": [
            {
                "name": "New User Created",
                "variable": "newUser",
                "type": "string",
                "properties": [
                    {
                        "name": "Channel",
                        "type": "enum",
                        "variable": "integration",
                        "values": [
                            "web"
                        ]
                    }
                ]
            },
            {
                "name": "Message Send",
                "variable": "newMessage",
                "properties": [
                    {
                        "name": "Channel",
                        "type": "enum",
                        "variable": "integration",
                        "values": [
                            "web"
                        ]
                    }
                ]
            }
        ]
    }
    object.installedModules = await getPackageByType(installedModule || 'core')
    let app = new applications(object)
    app.save(function (error, result) {
        if (!error) {
            defer.resolve(object);
        }
    })
    // })
    return defer.promise
}
applicationsList.prototype.publishToFirebase = function (appId, name, sorrySentences, defaultModule) {
    console.log("publishToFirebase")
    var defer = q.defer();
    let botUrl = "https://interaction.arrowai.in/application/add";
    let fields = [{
        "appId": appId,
        "appName": name,
        "sorrySentences": sorrySentences,
        "default_module": defaultModule
    }]
    this.ajaxCallPost(botUrl, fields).then(result => {
        if (result) defer.resolve(result);
    })
    return defer.promise
}

applicationsList.prototype.ajaxCallPost = function (botUrl, fields) {

    var defer = q.defer();
    var deferred = q.defer();
    try {
        request({
            headers: {
                'Content-Type': 'application/json',
            },
            uri: botUrl,
            body: JSON.stringify(fields),
            method: 'POST'
        }, function (err, res, body) {
            console.log("in function")
            if (err) console.log(err);
            else
                deferred.resolve(body)
        })

    } catch (error) {
        console.log(error)
    }
    return deferred.promise;
}
applicationsList.prototype.addIntegrationToApp = function (integraton, integrationId, integrationConfig, appId) {
    try {
        return new Promise((resolve, reject) => {
            // integrationAutomation.addIntegrationToApp(this.appId, integrationId, integrationConfig);
            let intObj = `integration.${integraton}.${integrationId}`,
                integrationObj = {
                    [intObj]: integrationConfig
                }
            applications.findOneAndUpdate(
                { _id: ObjectId(appId) },
                { $set: integrationObj },
                { upsert: true, new: true },
                function (err, updatedApplication) {
                    redisClient.del(`app_${this.appId}`);
                    redisClient.setBykey(`app_${this.appId}`,updatedApplication);
                    resolve(updatedApplication)
                }
            );
            // applications.findByIdAndUpdate({ _id: ObjectId(this.appId) }, { "$set": integrationObj },{returnOriginal: false}).then(async(err, updatedApplication)=> {

            //     // redisClient.setBykey(`app_${updatedApplication._id}`, updatedApplication).then(data => {
            //     //     resolve(updatedApplication)
            //     // })
            // })
        })
    } catch (error) {

    }

}

// getListOfAddOnForUser
applicationsList.prototype.getListOfAddOnForUser = function () {
    console.log("getListOfAddOnForUser")
    var defer = q.defer();
    addon.find({ users: { "$elemMatch": { user_id: ObjectId(this.userId) } } }).then((addonUserData) => {
        if (addonUserData) {
            defer.resolve(addonUserData);
        }
    })
    return defer.promise
}
applicationsList.prototype.getIntegration = function (integrationId) {
    try {
        return new Promise((resolve, reject) => {
            applications.findOne({ _id: ObjectId(this.appId) }).then(application => {
                resolve(application.integration[integrationId])
            })
        })
    } catch (error) { }
}
module.exports = applicationsList;