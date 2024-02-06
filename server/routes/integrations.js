var express = require('express');
var router = express.Router();
let users = require('../lib/users');
let applicationAuth = require('../lib/applicationAuth');
let applicationsList = require('../lib/applicationsList');

const integrationMargetPlace = require('./../services/integrationMarketPlaceService')
/* GET all integration list. */
router.get('/:applicationId/:integration', function (req, res, next) {
    try {
        let reqData = req.body;
        key = false;
        console.log(reqData);
        if (req.headers.hasOwnProperty("key")) {
            key = req.headers.key;
            console.log(key);
            if (req.params.hasOwnProperty('integration') && reqData.hasOwnProperty('applicationId')) {
                let applications = new applicationsList('', req.params.applicationId)
                applications.addIntegrationToApp(reqData.integrationId, reqData.integrationConfig).then(function (data) {
                    try {
                        res.json({ code: 0, success: data });
                    } catch (error) {

                    }
                }, function (err) {
                    console.log(err);
                    res.json({ code: 0, success: data });
                });
            } else {
                res.json({ code: 1, error: "integration id or integraion config missing" });
            }
        } else {
            res.json({ code: 1, error: "wrong credential" });
        }

    } catch (error) {
        console.log(error);
    }
});
router.get('/integrationMarketPlace', async (req, res) => {
    let data = [
        {
            "_id": "5f4f2fcaaee4185502927979", "web": { "config": { "webhookUrl": { "type": "string", "title": "Webhook Url", "required": true } } },
            "icon": "socicon-identica", "config": { "webhookUrl": { "type": "string", "title": "Webhook Url", "required": true, "readOnly": true } },
            "name": "web"
        }, {
            "_id": "5f4f2fd1aee418550292797a",
            "facebook": { "config": { "webhookUrl": { "type": "string", "title": "Webhook Url", "required": true }, "appAccessToken": { "type": "string", "title": "App Access Token", "required": true }, "userAccessToken": { "type": "string", "title": "User Access Token", "required": true } } }, "icon": "fab fa-facebook-messenger", "config": { "webhookUrl": { "type": "string", "title": "Webhook Url", "required": true }, "appAccessToken": { "type": "string", "title": "App Access Token", "required": true }, "userAccessToken": { "type": "string", "title": "User Access Token", "required": true } }, "name": "facebook"
        }, { "_id": "5f4f2fd8aee418550292797b", "whatsapp": { "config": { "webhookUrl": { "type": "string", "title": "Webhook Url", "required": true }, "appAccessToken": { "type": "string", "title": "App Access Token", "required": true }, "userAccessToken": { "type": "string", "title": "App Access User", "required": true } } }, "icon": "socicon-whatsapp", "config": { "webhookUrl": { "type": "string", "title": "Webhook Url", "required": true }, "appAccessToken": { "type": "string", "title": "App Access Token", "required": true }, "userAccessToken": { "type": "string", "title": "App Access User", "required": true } }, "name": "whatsapp" },
        {
            "_id": "5f4f2fdeaee418550292797c",
            "dialogflow": { "config": { "webhookUrl": { "type": "string", "title": "Webhook Url", "required": true } } }, "icon": "socicon-google", "config": { "webhookUrl": { "type": "string", "title": "Webhook Url", "required": true } }, "name": "dialogflow"
        }];
    res.send(data);
   // let integeations = await integrationMargetPlace.getIntegrations();
   // res.send(integeations);

})
router.post('/', function (req, res, next) {
    try {
        let reqData = req.body;
        key = false;
        console.log(reqData);
        // if (req.headers.hasOwnProperty("key")) {
        //     key = req.headers.key;
        //     console.log(key);
        if (reqData.hasOwnProperty('integrationId') && reqData.hasOwnProperty('integrationConfig')) {
            let applications = new applicationsList('', req.body.appId)
            applications.addIntegrationToApp(reqData.integration, reqData.integrationId, reqData.integrationConfig,req.body.appId).then(function (data) {
                try {
                    res.json({ code: 0, success: data });
                } catch (error) {

                }
            }, function (err) {
                console.log(err);
                res.json({ code: 0, success: data });
            });
        } else {
            res.json({ code: 1, error: "integration id or integraion config missing" });
        }
        // } else {
        //     res.json({ code: 1, error: "wrong credential" });
        // }

    } catch (error) {
        console.log(error);
    }
});
router.put('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.delete('/', function (req, res, next) {
    res.send('respond with a resource');
});
module.exports = router;