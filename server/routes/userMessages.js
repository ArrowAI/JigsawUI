

const express = require('express');
const messageRoute = express.Router();

const { getUserMessagesFromBigQuery, getUserMessagesFromCosmo } = require('./../services/userMessageService')


messageRoute.post('/userMessagesCosmo', async (req, res) => {
    let requestBody= req.body;
    
    if (requestBody.hasOwnProperty("applicationId") && requestBody.hasOwnProperty("groupId")) {
        let response = await getUserMessagesFromCosmo(req.body);
        res.send(response)
    }
    else {
        res.json({ message: "missing applicationId or groupId" });

    }
})

messageRoute.post('/userMessagesBigQuery',async (req, res) => {
    let requestBody= req.body;
    if (requestBody.hasOwnProperty("applicationId") && requestBody.hasOwnProperty("groupId")) {
        let response = await getUserMessagesFromBigQuery(req.body);
        res.send(response);
    }
    else {
        res.json({ message: "missing applicationId or groupId" });

    }
});

module.exports=messageRoute;