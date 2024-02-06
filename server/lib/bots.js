let q = require("q");
let ObjectId = require('mongodb').ObjectID;
let redisClient = require('../config/redis');

let applications = require("../models/application");

const intentModel = require('./../models/triggers');

const botModel = require('../models/bots');
const entityModel = require('./../models/storymeta');
let applicationsList = require('../lib/applicationsList');
let redishHelper = {
    getbotList: function (userId) {
        let defer = q.defer();
        try {
            redisClient.getByKey("botList_" + userId).then(function (botList) {
                defer.resolve(botList);
            })
        } catch (err) {
            console.log(err);
        }
        return defer.promise;
    },
    setbotList: function (userId, bots) {
        redisClient.setBykey("botList_" + userId, bots);
    },

}
let bots = function (userId, appId, botId) {
    this.userId = userId;
    this.appId = appId;
    this.botId = botId;
};
bots.prototype.getListOfBotForApp = function () {

    let defer = q.defer();
    let self = this;
    if (this.userId) {
        // redisClient.getByKey("getListOfBotForApp__").then(function (botListData) {
        //     if(botListData==null){
        applications.findOne({ _id: ObjectId(self.appId) }).then(function (botApplication) {
            if (botApplication == null) defer.resolve("in correct appId")
            botApplication = JSON.parse(JSON.stringify(botApplication));
            if (botApplication.hasOwnProperty('bots')) {
                // let botList = botApplication.bots.map(bot => bot.bot_id);
                let botList = botApplication.bots.map(data => {
                    data = (JSON.parse(JSON.stringify(data)));
                    data.id = data.bot_id;
                    return data;
                })
                defer.resolve(botList);
                // botModel.find({ _id: { "$in": botsKey } }).then((botList) => {
                //     if (botList) {
                //         console.log("inif")
                //         botList.map(data => {
                //                 data.id = data._id;
                //                 return data;
                //             })
                //             // redisClient.setBykey("getListOfBotForApp__",botList);
                //         defer.resolve(botList);
                //     } else {
                //         defer.resolve();
                //     }
                // })
            } else {
                defer.resolve({ bots: [] })
            }

        })
        //    / }
        //     else
        //     {
        //         defer.resolve(botListData)
        //     }
        // })
    } else {
        defer.resolve("you are not authorized to view this API");
    }

    return defer.promise;
}
bots.prototype.getAllPublicBots = function () {
    var defer = q.defer();
    try {
        redisClient.getByKey("getAllPublicBots_").then(function (botList) {
            if (botList == null) {
                bots.find({ public: 1 }).then(botlist => {
                    if (botlist) {
                        redisClient.setBykey("getAllPublicBots_", botlist);
                        defer.resolve(botlist)
                    }
                })
            } else {
                defer.resolve(botList)
            }
        })
    } catch (err) {
        console.log(err);
    }


    return defer.promise
}
bots.prototype.getFeaturedPublicBots = function () {
    var defer = q.defer();
    redisClient.getByKey("getFeaturedPublicBots_").then(function (botList) {
        if (botList == null) {
            bots.find({ public: 1, featured: true }).then(botlist => {
                if (botlist) {
                    redisClient.setBykey("getFeaturedPublicBots_", botlist);
                    defer.resolve(botlist)
                }
            })
        }
    })

    return defer.promise
}
bots.prototype.getListOfBotForUser = function () {
    var defer = q.defer();
    console.log("getListOfBotForUser")
    redisClient.getByKey("getListOfBotForUser_").then(function (botList) {
        if (botList == null) {
            bots.find({ users: { "$elemMatch": { user_id: ObjectId(this.userId) } } }).then((listOfBot) => {
                if (listOfBot) {
                    redisClient.setBykey("getListOfBotForUser_", listOfBot);
                    defer.resolve(listOfBot)
                }
            })
        }
    })

    return defer.promise
}
bots.prototype.getBotDetail = function () {
    try {
        let self = this;
        return new Promise(function (resolve, reject) {
            // return new Promise((resolve, reject => {
            botModel.findOne({ _id: ObjectId(self.botId) }).then(botDetail => {
                console.log(botDetail);
                resolve(JSON.parse(JSON.stringify(botDetail)));
            })


        })



        // }))
    } catch (error) {
        console.log(error);
    }



}
bots.prototype.crateNewBot = (bot, userId, appId) => {
    return new Promise((resolve, reject) => {
        let newBot = new botModel({
            "name": bot.name,
            "description": bot.description,
            "image_url": "",
            "users": [{
                "user_id": userId,
                "created_at": new Date().getTime(),
                "role": "owner",
                "username": ""
            }],
            "menus": [],
            "suggestions": [],
            "initialGreetings": '',
            "public": 1,
            "tags": [],
            "category": "private",
            "language": "en",
            "repository": "owner",
            "type": bot.type,
            "customUrl": bot.customUrl || '',
            "clientSecret": bot.customUrl || '',
            "detail":bot.detail||{}

        });
        // save model to database
        newBot.save(function (err, bot) {
            if (err) return console.error(err);
            let applications = new applicationsList('', appId);
            let botForApplication = {
                'bot_id': ObjectId(bot._id),
                'bot_text': bot.name,
                'language': bot.language,
                'type': bot.type,
                "customUrl": bot.customUrl || '',
                "clientSecret": bot.customUrl || ''
            }
            applications.addBotToApplication(botForApplication)
            resolve({ id: bot._id, "name": bot.name, "language": "en" });
        });
    })

}

bots.prototype.updateBotDetail = function (botData) {
    try {
        let self = this;
        return new Promise(function (resolve, reject) {
            botModel.findOneAndUpdate({ _id: ObjectId(self.botId) }, { "$set": { detail: botData } }).then(data => {
               
                let key = `bot_intents_${self.botId}`;
                redisClient.del(key);
                redisClient.setBykey(key, botData.intents);
                resolve(data);
               
            })
        })
        // }))
    } catch (error) {
        console.log(error);
    }



}
module.exports = bots;