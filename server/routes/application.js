var express = require('express');
var router = express.Router()
let applicationAuth = require('../lib/applicationAuth');
let applicationsList = require('../lib/applicationsList');

let AgentController = require('./../controllers/agentsController')
const verifyToken = require('./../middleware/verifyToken');


/*  image azure code code  */
var multer = require('multer')
var multerAzure = require('multer-azure');
var upload = multer({
    storage: multerAzure({
        connectionString: 'DefaultEndpointsProtocol=https;AccountName=bitrixdocs;AccountKey=zDkPoHWodjZLoB5iKWEPoSU4J1epcgLmTJCVOxk00RwSfugjBQXO5u1dM7pcrWidWU2JhXPXm0qM36+OOF+pQA==;EndpointSuffix=core.windows.net;', //Connection String for azure storage account, this one is prefered if you specified, fallback to account and key if not.
        account: 'bitrixdocs', //The name of the Azure storage account
        key: 'zDkPoHWodjZLoB5iKWEPoSU4J1epcgLmTJCVOxk00RwSfugjBQXO5u1dM7pcrWidWU2JhXPXm0qM36+OOF+pQA==', //A key listed under Access keys in the storage account pane
        container: 'soya' //Any container name, it will be created if it doesn't exist
        //container: 'soya' 
    })
});
/* ------------------ */


router.post('/', function (req, res, next) {
    let sessionid = false,
        key = false;
    if (req.body.hasOwnProperty("sessionid")) {
        page = parseInt(req.body.page, 10);
    } else {
        res.json({ code: 1, error: "wrong credential" });
    }
    if (req.body.hasOwnProperty("key")) {
        key = req.body.key;
    } else {
        res.json({ code: 1, error: "wrong credential" });
    }
    applicationAuth.tasks.authenticateArrowCredentials(req.body.key).then(function (user) {
        if (!!user && user.hasOwnProperty("user_id")) {
            console.log(user);
            let applications = new applicationsList(user.user_id)
            applications.getFilterApplication().then(function (data) {
                res.json({ code: 0, "status": "success", data: data });
            }, function (err) {
                console.log(err);
                res.json({ code: 1, error: "Wrong Key" });
            });
        } else {
            res.json({ code: 1, error: "Wrong Key" });
        }

    })

});
router.get('/:applicagionId', function (req, res, next) {
    // console.log(req.body);
    let applicagionId = req.params.applicagionId;
    console.log(applicagionId);
    let applications = new applicationsList('', applicagionId)
    applications.getAppDetail().then(function (data) {
        try {
            res.json(data[0]);
        } catch (error) {

        }

    }, function (err) {
        console.log(err);
        res.json({ code: 1, error: "Wrong Key" });
    });





});
router.get('/installedModules/:applicagionId', function (req, res, next) {
    // console.log(req.body);
    let applicagionId = req.params.applicagionId;
    console.log(applicagionId);
    let applications = new applicationsList('', applicagionId)
    applications.getInstalledModules().then(function (data) {
        try {
            data = JSON.parse(JSON.stringify(data));
            res.json(data.installedModules);
        } catch (error) {
            res.json([]);
        }

    }, function (err) {
        console.log(err);
        res.json({ code: 1, error: "Wrong Key" });
    });





});
router.post('/verifyAppforUser', function (req, res, next) {
    let sessionid = false,
        key = false;
    appId = false;
    if (req.body.hasOwnProperty("sessionid")) {
        sessionid = req.body.sessionid;
    } else {
        res.json({ code: 1, error: "wrong credential" });
    }
    if (req.body.hasOwnProperty("key")) {
        key = req.body.key;
    } else {
        res.json({ code: 1, error: "wrong credential" });
    }
    if (req.body.hasOwnProperty('appId')) {
        appId = req.body.appId;
    } else {
        res.json({ code: 1, error: "appId missing" });
    }
    applicationAuth.tasks.authenticateArrowCredentials(key).then(function (user) {
        if (!!user && user.hasOwnProperty("user_id")) {
            let applications = new applicationsList(user.user_id, appId)
            applications.verifyAndGetAppDetailForUser().then(function (data) {
                res.json({ code: 0, "status": "success", data: data });
            }, function (err) {
                res.json({ code: 1, error: "Wrong Key" });
            });
        } else {
            res.json({ code: 1, error: "Wrong Key" });
        }

    })
});
// Get Application For User
router.post('/authenticateApp', function (req, res, next) {
    res.send({
        "code": 0,
        "status": "success",
        "data": { "headerKey": "Basic NWM1N2QyYzEwNTkxYjMxMDAwOGI0NTY3OjEyMzQ1Njc=" }
    })
});
//Get list of intelligence applications for user
router.post('/intelligenceApplication', function (req, res, next) {

    res.send({
        "code": 0,
        "status": "success",
        "data": []
    })
});
//Get list of add on for application
router.post('/addonUserApplications', function (req, res, next) {

    if (req.body.hasOwnProperty("sessionid")) {
        page = parseInt(req.body.page, 10);
    } else {
        res.json({ code: 1, error: "wrong credential" });
    }
    if (req.body.hasOwnProperty("key")) {
        key = req.body.key;
    } else {
        res.json({ code: 1, error: "Sorry you need to be logged in to view this api." });
    }
    res.json({ "code": 0, "status": "success", "data": [] });
    // applicationAuth.tasks.authenticateArrowCredentials(req.body.key).then(function (user) {
    //     if (!!user && user.hasOwnProperty("user_id")) {
    //         let applications = new applicationsList(user.user_id, "")
    //         applications.getListOfAddOnForUser().then(addOnListForUser=>{
    //             if(addOnListForUser)
    //             {
    //                 res.send({
    //                     "code": 0, "status": "success",
    //                     "data": addOnListForUser
    //                 })
    //             }
    //             else
    //             {
    //                 res.send("Wrong User Credentials")
    //             }

    //         })

    //     }
    // })


});
//Get list Application For User
router.post('/listapplicationforuser', function (req, res, next) {
    if (req.body.hasOwnProperty("sessionid")) {
        page = parseInt(req.body.page, 10);
    } else {
        res.json({ code: 1, error: "wrong credential" });
    }
    if (req.body.hasOwnProperty("key")) {
        key = req.body.key;
    } else {
        res.json({ code: 1, error: "Sorry you need to be logged in to view this api." });
    }
    applicationAuth.tasks.authenticateArrowCredentials(req.body.key).then(function (user) {
        if (!!user && user.hasOwnProperty("user_id")) {
            let applications = new applicationsList(user.user_id, "")
            applications.getListOfAppForUser().then(data => {
                res.send(data);
            })
        } else {
            res.json({ code: 1, error: "wrong Key" });
        }
    })

});
/* Add New App For User*/
router.post('/addnewapplication', verifyToken, async function (req, res, next) {
    console.log(req.body);
    let name = req.body.name;
    let description = req.body.description
    let installedModule = req.body.installedModule || 'core';
    let user = req.body.user || {};
    user.id = req.body.userId;
    let imageUrl = "";
    let public
    if (req.hasOwnProperty("file")) {
        console.log("in file");
        imageUrl = req.file.url
    }
    if (req.body.hasOwnProperty("public") && !req.body.public == "") {
        (req.body.public == 1) ? public = 1 : public = 0;
    }
    let applications = new applicationsList(req.body.userId, "")
    try {
        applications.addNewAppForUserId(name, description, imageUrl, req.body.category, req.body.tags, public, req.body.userId, {}, {}, installedModule).then(async appDetail => {
            // await AgentController.createAgent({ agent: user, applicationId: appDetail._id },res)
            res.send(appDetail)
        })
    } catch (error) {
        console.log(error)
    }

});
router.post('/updateApplication', verifyToken, function (req, res) {
    let key = '';
    if (req.headers.hasOwnProperty("key")) {
        key = req.headers.key;
    } else {
        res.json({ code: 1, error: "wrong credential" });
    }
    // applicationAuth.tasks.authenticateArrowCredentials(key).then(function (user) {
    // if (!!user && user.hasOwnProperty("user_id")) {
    // console.log(user);
    let applications = new applicationsList(req.body.userId, req.body.applicationId)
    applications.updateApplication(req.body.applicationDetail).then(function (data) {
        res.json({ code: 0, "status": "success", data: data });
    }, function (err) {
        console.log(err);
        res.json({ code: 1, error: "Wrong Key" });
    });
    // } 
    // else {
    //     res.json({ code: 1, error: "Wrong Key" });
    // }

    // })

})
// router.post("/addTestApp",function(req,res,next){
//     let applications = new applicationsList("", "")
//     applications.addNewApplication().then(function(data){
//         res.send(data);
//     })
// })



module.exports = router;