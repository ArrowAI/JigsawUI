const constants = require('./../config/constants');
const applicationEvents = require('./../models/events');
const { CLOUD_PROJECTID, BIGQUERY_DATASET } = constants;
const { executeQuery } = require('./../lib/bigQuery');
const getUserMessagesFromCosmo = async (body) => {
    let { applicationId, groupId, perPage, page } = body;
  
    let messages = await applicationEvents.find({ applicationId, groupId }).limit(perPage)
        .skip(perPage * page).sort({
            timestamp: 'desc'
        });
    return messages
};
const getUserMessagesFromBigQuery = async (body) => {
    let { applicationId, groupId, perPage, page } = body;
    let messages = await executeQuery(`SELECT *,CAST (timestamp as DATE) as createdAt FROM \`${CLOUD_PROJECTID}.${BIGQUERY_DATASET}.application_events\`
     where applicationId='${applicationId}' 
     and groupId='${groupId}' ORDER BY timestamp DESC LIMIT ${page || 20}`);
    return messages.map(message => {
        message.event_attributes = JSON.parse(message.event_attributes);
        if (message.message)
            message.message = typeof message.message == 'string' ? JSON.parse(message.message) : message.message;
        return message
    });
};

module.exports = {
    getUserMessagesFromCosmo,
    getUserMessagesFromBigQuery

}