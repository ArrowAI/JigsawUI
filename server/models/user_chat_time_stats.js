var mongoose = require("./../config/mongooseDB");
var Schema = mongoose.Schema;
var environment = process.env.NODE_ENV;

var userChatTimeStatsSchema = new Schema({
    windows: Schema.Types.Mixed,
    numberOfConversations: Schema.Types.Number,
    timeUnit:String,
    averageReturnTime: Schema.Types.Number,
    earliestReturnTime: Schema.Types.Number,
    latestReturnTime: Schema.Types.Number,
    minimumMessagesInConversation: Schema.Types.Number,
    maximumMessagesInConversation: Schema.Types.Number,
    averageMessagesPerConversation: Schema.Types.Number,
    uniqueUserId: {type: String, index: true}
}, { strict: false, collection:'temp_collection'});

var userStatistics = new Schema({
    windows: Schema.Types.Mixed,
    numberOfConversations: Schema.Types.Number,
    timeUnit:String,
    averageReturnTime: Schema.Types.Number,
    earliestReturnTime: Schema.Types.Number,
    latestReturnTime: Schema.Types.Number,
    minimumMessagesInConversation: Schema.Types.Number,
    maximumMessagesInConversation: Schema.Types.Number,
    averageMessagesPerConversation: Schema.Types.Number,
    uniqueUserId: {type: String, index: true}
}, { strict: false, collection:"UserChatTimeStats_"+environment});

var exports={
    userChatTimeStats : mongoose.model("UserChatTimeStats_"+environment, userChatTimeStatsSchema),
    userStatistics: mongoose.model("UserChatStatistics_"+environment,userStatistics)
};

module.exports = exports;