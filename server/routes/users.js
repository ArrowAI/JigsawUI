var express = require('express');
var router = express.Router();
let users = require('../lib/users');
let applicationAuth = require('../lib/applicationAuth');
let applicationsList = require('../lib/applicationsList');
const verifyToken = require('./../middleware/verifyToken');
/* GET all user segment list. */

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
    let newUser = req.body;

    if ((!newUser.hasOwnProperty('email')) || (!newUser.hasOwnProperty('name'))) {
        res.json({ "success": 0, "message": "Enter Email Id / Email not Correct" });
    } else if ((!newUser.hasOwnProperty('password'))) {
        res.json({ "success": 0, "message": "Enter Password / Password should be minimum 6 digits" });

    } else {
        users.addNewUser(req.body).then((newUser) => {
            res.json(newUser);
            let name = "Default Application";
            let description = "This is Default Application"
            let imageUrl = "";
            let public = 0
            let applications = new applicationsList(newUser._id, "")
            applications.createDefaultBotCopy().then(defaultBotConfig => {
                try {
                    applications.addNewAppForUserId(name, description, imageUrl, "", [name], public, newUser._id, defaultBotConfig.triggerData, defaultBotConfig.botData,req.installedModules).then(appDetail => {
                        let sorrySentences = (appDetail.hasOwnProperty("sorrySentence")) ? appDetail.sorrySentence : [];
                        console.log(appDetail)
                    })
                } catch (error) {
                    console.log(error)
                }

            })

        })
    }
    // res.send('respond with a resource');
});
router.post('/authenticateUser', function(req, res, next) {
    try {
        let user = req.body;
        console.log(user);
        if ((!user.hasOwnProperty('email'))) {
            res.json({ "success": 0, "message": "Enter Email Id / Email not Correct" });
        } else if ((!user.hasOwnProperty('password'))) {
            res.json({ "success": 0, "message": "Enter Password / Password should be minimum 6 digits" });

        } else {
            users.authenticateUser(req.body).then((user) => {
                if (!user.hasOwnProperty("name")) {
                    res.json({ "code": 1, "status": "error", "error": "Wrong Credentials" });
                }
                res.json({
                    "code": 0,
                    "status": "success",
                    "data": user
                });
            })
        }
    } catch (error) {
        console.log(error);
    }

});
router.post('/authenticateSocialUser', function(req, res, next) {
    try {
        let user = req.body;
        console.log(user);
        if ((!user.hasOwnProperty('email'))) {
            res.json({ "success": 0, "message": "Enter Email Id / Email not Correct" });
        } else if ((!user.hasOwnProperty('password'))) {
            res.json({ "success": 0, "message": "Enter Password / Password should be minimum 6 digits" });

        } else {
            users.authenticateUser(req.body).then((user) => {
                if (!user.hasOwnProperty("name")) {
                    res.json({ "code": 1, "status": "error", "error": "Wrong Credentials" });
                }
                res.json({
                    "code": 0,
                    "status": "success",
                    "data": user
                });
            })
        }
    } catch (error) {
        console.log(error);
    }

});

router.get('/authenticateUser', function(req, res, next) {
    // console.log(req.headers);
    let sessionid = false,
        key = false;

    if (req.headers.hasOwnProperty("key")) {
        key = req.headers.key;
    } else {
        res.json({ code: 1, error: "wrong credential" });
    }
    applicationAuth.tasks.getUserByToken(key).then(function(user) {

        res.send(user);

    })

});
router.get('/userConfig',verifyToken, function(req, res, next) {
    // console.log(req.headers);
    let sessionid = false,
        key = false;
    if (req.headers.hasOwnProperty("key")) {
        key = req.headers.key;
    } else {
        res.json({ code: 1, error: "wrong credential" });
    }
    applicationAuth.tasks.getApplicationConfig(key,req.body.userId).then(function(user) {
        console.log(user);
        res.send(user);
    })
});
router.put('/update', function(req, res, next) {
    res.send('respond with a resource');
});
router.delete('/delete', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/filterUserBySegmentId', function(req, res, next) {
    res.send('respond with a resource');
});
router.post('/cohortList', function(req, res, next) {
    // let applicationId = req.body.applicationId;
    let reqBody = req.body;
    try {
        if (reqBody.hasOwnProperty('applicationId')) {
            user.getCohortList(reqBody.applicationId)
                .then(function(results) {
                    res.json(results);
                });
        } else {
            res.send({ "code": 0 })
        }
    } catch (ex) {
        console.log(ex)
    }
})
router.get('/campaign', function(req, res, next) {
    res.send({
        items: [{
                id: "fdsfdsfadsfdsf",
                "campaignType": "Past Behaviour",
                "type": "oneTime",
                "userSegmentType": "For past behavior segments",
                "when": {},
                "start": "now",
                "channel": "web",
                "what": {
                    "component": "text",
                    "list": [{
                            "buttons": [],
                            "description": "",
                            "image": "",
                            "title": "",
                            "url": ""
                        },
                        {
                            "buttons": [],
                            "description": "",
                            "image": "",
                            "title": "",
                            "url": ""
                        }
                    ],
                    "card": [],
                    "text": "hi",
                    "video": "",
                    "image": {}
                },
                "who": {},
                "messageType": "oneTime",
                "dates": [{
                    "date": ""
                }],
                "end": "neverEnd",
                "name": "Incomplete Purchases"
            },
            {
                id: "fdsfdsfadsfdsfs",
                "type": "oneTime",
                "campaignType": "Past Behaviour",
                "userSegmentType": "For past behavior segments",
                "when": {},
                "start": "now",
                "channel": "web",
                "what": {
                    "component": "text",
                    "list": [{
                            "buttons": [],
                            "description": "",
                            "image": "",
                            "title": "",
                            "url": ""
                        },
                        {
                            "buttons": [],
                            "description": "",
                            "image": "",
                            "title": "",
                            "url": ""
                        }
                    ],
                    "card": [],
                    "text": "hi",
                    "video": "",
                    "image": {}
                },
                "who": {},
                "messageType": "oneTime",
                "dates": [{
                    "date": ""
                }],
                "end": "neverEnd",
                "name": "Weekend Sale Reminder"
            }
        ],
        totalCount: 2
    });
});
module.exports = router;