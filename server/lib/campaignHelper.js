let q = require("q");
let ObjectId = require('mongodb').ObjectID;
let campaigns = require("../models/campaign");
const { Datastore } = require('@google-cloud/datastore');
let request = require('request');
const parser = require('cron-parser');
const moment = require('moment');
const momentTimeZone = require("moment-timezone");
const { CAMPAIGN_NAMESPACE
} = require('./../config/constants');
const datastore = new Datastore({
    projectId: "arrowai-kubernetes",
    namespace: CAMPAIGN_NAMESPACE,
    keyFilename: './config/arrowai-kubernetes-dc5cb1315c35.json'
});
const addToDataStore = async (data) => {
    try {
        data.forEach(async event => {
            const Key = datastore.key("campaign");
            const option = {
                key: Key,
                data: event
            };
            console.log(option);
            let result = await datastore.save(option);
            return result;
        })
    } catch (error) {
        console.log("error in saving datastore");
        console.log(error)
    }
};


const covertDateToCron = (dateString) => {
    var date = new Date(dateString);
    var mins = date.getMinutes();
    var secs = date.getSeconds();
    var hours = date.getHours()
    var dayofmonth = date.getDate();
    var month = date.getMonth() + 1;
    var dayofweek = date.getDay();
    return `${secs} ${mins} ${hours} ${dayofmonth} ${month} ${dayofweek}`
}
const _getCronValue = (type, value) => {
    if (type == 'minute') {
        return `*/${value} * * * *`;
    }
    else if ('second') {
        return `${value} * * * *`;
    }
    else if ('hour') {
        return `0 */${value} * * *`
    }
    else {
        return `0 0 */${value} * *.`
    }
}


let requestHelper = {
    callCampaignApi: (data => {
        let requestOptions = {
            url: constants.INTERACTION_ENGINE + "/content/pushContent",
            json: {
                "appid": "578666c93a488b4d008b4568",
                "userids": [{
                    "id": "-LxLVPx3EBuq9mw-zJsn"
                }],
                cohortId: false, //SegmentId here
                "module": 1,
                "step": 4,
                "selecttoall": false,
                "messageType": "message",
                "content": [{
                    "senditem": "text",
                    "type": "push",
                    "key": "",
                    "preview_title": "hey how are you",
                    "preview_description": "",
                    "preview_image": "",
                    "message": {
                        "text": "hey"
                    }
                }],
                "sendType": "single_user",
                "channels": {
                    "web": true
                },
                "channelpolicy": "all",
                "apptoken": "",
                "key": "",
                "sessionid": "NTc4NjY2YjYzYTQ4OGI0ZDAwOGI0NTY3KzE1Nzc0Mjc2NTY=",
                "app_id": "578666c93a488b4d008b4568"
            }
        };
        request.post(requestOptions, (err, response) => {
            if (err) {
                console.log("error in campaign Api", err)
            } else {
                console.log(response);
                console.log("capaign api call successfully")
            }
        });
    })
}

let campaignHelper = function (appId, campaignId) {
    this.applicationId = appId;
    this.campaignId = campaignId

};
campaignHelper.prototype.AddCampaign = function (campainObject) {
    let defer = q.defer();
    let campaign = new campaigns(campainObject)
    campaign.save(function (error, result) {
        if (!error) {
            defer.resolve(result);
        }
        let nextTimeToRun = [];
        if (campainObject.type == 'oneTime') {
            if (campainObject.hasOwnProperty('when') && campainObject.when.hasOwnProperty('start')) {
                if (campainObject.when.start == 'now' && campainObject.userSegmentType == 'For past behavior segments') {
                    // requestHelper.callCampaignApi(campainObject);
                }
                else {
                    let dateObj = `${momentTimeZone.tz(when.startDate, "Asia/Calcutta").format('YYYY-MM-DD')} ${when.time}`;
                    // dateObj = `${momentTimeZone.tz(dateObj, "Asia/Calcutta").format('YYYY-MM-DD hh:mm:ss.SSS')}`;
                    let timeToRun = new Date(dateObj).getTime();
                    let cron = covertDateToCron(timeToRun);
                    nextTimeToRun.push({
                        campaignId: result._id.toString(),
                        nextTimeToRun: timeToRun,
                        cron: cron,
                        type: campainObject.type,
                        applicationId: campainObject.applicationId,
                        endType: "afterExecute"
                    })
                }
            }
        }
        else if (campainObject.type == 'multipleTime') {
            campainObject.when.dates.forEach(when => {
                let dateObj = `${momentTimeZone.tz(when.date, "Asia/Calcutta").format('YYYY-MM-DD')} ${when.time}`;
                // dateObj = `${momentTimeZone.tz(dateObj, "Asia/Calcutta").format('YYYY-MM-DD hh:mm:ss.SSS')}`;
                let timeToRun = new Date(dateObj).getTime();
                console.log(new Date(timeToRun));
                let cron = covertDateToCron(timeToRun);
                nextTimeToRun.push({
                    campaignId: result._id.toString(),
                    nextTimeToRun: timeToRun,
                    cron: cron,
                    type: campainObject.type,
                    applicationId: campainObject.applicationId,
                    endType: "afterExecute"

                })
            });
        }
        else if (campainObject.type == "recurring") {
            campainObject.when.dates.forEach(when => {
                let dateObj = `${momentTimeZone.tz(when.date, "Asia/Calcutta").format('YYYY-MM-DD')} ${when.time}`;
                // dateObj = `${momentTimeZone.tz(dateObj, "Asia/Calcutta").format('YYYY-MM-DD hh:mm:ss.SSS')}`;
                let timeToRun = new Date(dateObj).getTime();
                console.log(new Date(timeToRun));
                let cron = covertDateToCron(timeToRun);
                nextTimeToRun.push({
                    campaignId: result._id.toString(),
                    nextTimeToRun: timeToRun,
                    cron: cron,
                    type: campainObject.type,
                    applicationId: campainObject.applicationId,
                    endType: campainObject.end,
                    endOnDate: campainObject.endOnDate || '',
                    endAfterOccurrences: campainObject.endAfterOccurrences || ''
                })
            });
        }
        else {

            nextTimeToRun.push({
                campaignId: result._id.toString(),
                nextTimeToRun: "neverEnd",
                cron: "neverEnd",
                type: campainObject.type,
                applicationId: campainObject.applicationId,
                endType: "neverEnd",
                segmentId: result.segment ? result.segment._id.toString() : ''
            })
        }
        // console.log(nextTimeToRun);
        addToDataStore(nextTimeToRun)
        defer.resolve(result);
    })

    return defer.promise
}
campaignHelper.prototype.getCampaigns = function () {
    let defer = q.defer();
    console.log("applicationId", this.applicationId)
    campaigns.find({ applicationId: this.applicationId }).then((list) => {
        list = JSON.parse(JSON.stringify(list));
        let campaignList = list.map(campaigns => {
            campaigns.id = campaigns._id;
            return campaigns;
        })
        defer.resolve(campaignList);
    })
    return defer.promise;
};
campaignHelper.prototype.getCampaignById = function () {
    let defer = q.defer();
    console.log("applicationId", this.applicationId)
    campaigns.find({ _id: ObjectId(this.campaignId) }).then((list) => {
        list = JSON.parse(JSON.stringify(list));
        let campaignList = list.map(campaigns => {
            campaigns.id = campaigns._id;
            return campaigns;
        })
        defer.resolve(campaignList);
    })
    return defer.promise;
};
campaignHelper.prototype.processCampaign = function () {
    
}

module.exports = campaignHelper;