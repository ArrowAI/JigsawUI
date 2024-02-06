var mongoose = require("./../config/mongooseDB");
var Schema = mongoose.Schema;
var environment = process.env.NODE_ENV;

var userChatHistorySchema = new Schema({
    applicationId:  {type: String, index: true},
    botId: {type: String, index: true},
    sender: {
        id: {type: String, index: true}
    },
    recipient: {
        id: {type: String, index: true}
    },
    sentFromServer: Boolean,
    sentFromUser: Boolean,
    sentFromRep: Boolean,
    start: Number,
    timestamp: Number,
    messageData: Schema.Types.Mixed,
    message: Schema.Types.Mixed,
    payload: Schema.Types.Mixed,
    integration: {type: String, index: true},
    uniqueUserId: {type: String, index: true},
    overallSentimentValue: {type: Number, index: true},
    overallSentiment: {type: String, index: true}
}, { strict: false });

var userChatHistory = mongoose.model("UserChatHistory"+environment, userChatHistorySchema);

module.exports = userChatHistory;