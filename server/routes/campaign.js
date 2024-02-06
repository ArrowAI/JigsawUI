var express = require('express');
var router = express.Router()
let applicationAuth = require('../lib/applicationAuth');
let campaignHelper = require('../lib/campaignHelper');
const { getSegmentUserById } = require('../lib/segment');
let applicationsList = require('../lib/applicationsList');
let GroupUser = require('../lib/cohort')

router.post('/', function (req, res, next) {
    let sessionid = false,
        key = false;

    if (req.headers.hasOwnProperty("key")) {
        key = req.headers.key;
    } else {
        res.json({ code: 1, error: "wrong credential" });
    }
    // applicationAuth.tasks.authenticateArrowCredentials(key).then(function (user) {
    // if (!!user && user.hasOwnProperty("user_id")) {
    //console.log(user);
    let campaigns = new campaignHelper(req.body.applicationId)
    campaigns.AddCampaign(req.body).then(function (data) {
        res.json({ code: 0, "status": "success", data: data });
    }, function (err) {
        //console.log(err);
        res.json({ code: 1, error: "Wrong Key" });
    });
    // } else {
    //     res.json({ code: 1, error: "Wrong Key" });
    // }
    // })

});
router.get('/:applicationId', function (req, res, next) {
    let applicationId = req.params.applicationId;
  
    if (req.headers.hasOwnProperty("key")) {
        key = req.headers.key;
    } else {
      return  res.json({ code: 1, error: "wrong credential" });
    }

    let campaigns = new campaignHelper(applicationId)
    campaigns.getCampaigns().then(function (data) {
        res.json({ code: 0, "status": "success", data: data });
    }, function (err) {
        console.log(err);
        res.json({ code: 1, error: err });
    });


})
router.get('/detail/:campaignId', function (req, res, next) {
    let campaignId = req.params.campaignId;
    console.log("headers", req.headers);
    // return;
    console.log(req.headers, "headers");
    let sessionid = false,
        key = false;

    if (req.headers.hasOwnProperty("key")) {
        key = req.headers.key;
    } else {
        res.json({ code: 1, error: "wrong credential" });
    }
    applicationAuth.tasks.authenticateArrowCredentials(key).then(function (user) {
        if (!!user && user.hasOwnProperty("user_id")) {

            let campaigns = new campaignHelper('', campaignId)
            campaigns.getCampaignById().then(function (data) {
                res.json({ code: 0, "status": "success", data: data });
            }, function (err) {
                console.log(err);
                res.json({ code: 1, error: "Wrong Key" });
            });
        } else {
            res.json({ code: 1, error: "Wrong Key" });
        }

    })

})
router.post('/launch', async (req, res, next) => {
    try {
        if (req.body.hasOwnProperty("appid") && req.body.hasOwnProperty("channels") && req.body.hasOwnProperty("content")) {
            let groupUserIds = req.body.userids || [],
                content = req.body.content || [],
                channels = req.body.channels || [],
                applicationId = req.body.appid,
                sendToAll = req.body.selecttoall || false,
                sendType = req.body.sendType || '',
                plateFormList = [],
                filters = [],
                pushType = content[0].type || "",
                cohortId = false,
                lookupEvents = false,
                messageType = req.body.messageType || 'message',
                notification = req.body.notification || {};
            if (sendType === "single_user") {
                let groupUsersId = groupUserIds.map(function (groupUser) {
                    return groupUser.id;
                });
                filters = [{ "match": { '_id': { '$in': groupUsersId } } }];
            } else if (sendType === "all") {
                filters = [];
            } else if (sendType === "cohort") {
                lookupEvents = true; // TODO: Think over it later
                cohortId = req.body.cohort[0].id || false;
            }

            let recipients = await getSegmentUserById(cohortId);
            recipients = recipients.map((user => {
                return user.groupId;
            }));
            let application = new applicationsList('', applicationId);
            let integrationConfig = await application.getIntegrationConfig(Object.keys(channels)[0] || 'web');

            let groupUser = new GroupUser(applicationId);
            let groupUsers = await groupUser.getGroupUserByGroupId(recipients);

            let sendObject = {
                recipients: groupUsers,
                integrationConfig
            };
            sendObject.applicationId = applicationId;

            sendObject.sender = {
                id: "api",
                name: "Api Call"
            };
            sendObject.integration = Object.keys(channels)[0] || 'web',
                sendObject.sentFromServer = false;
            sendObject.sentFromUser = false;
            sendObject.sentFromRep = true;
            sendObject.seenByUser = false;
            sendObject.needVerification = false;
            sendObject.timestamp = new Date().getTime();
            sendObject.payload = {
                integration: Object.keys(channels)[0] || 'web'
            };
            console.log(sendObject);
            try {
                sendObject.message_id = Math.random().toString(36).substring(2) +
                    (new Date()).getTime().toString(36);
                sendObject.message = content[0].message;
                io.emit(sendObject.integration, sendObject);

            } catch (e) {
                console.log("error in object", e);
            }
            res.send({ status: true, message: "success" });
        } else {
            res.send({ status: true, message: "invalid parameters" });
        }


    } catch (error) {
        res.send({ status: false, message: error });
    }
});

module.exports = router;