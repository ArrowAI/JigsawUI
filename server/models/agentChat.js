let mongoose = require("../config/mongooseDB");
let Schema = mongoose.Schema;
let environment = process.env.NODE_ENV;
let mongoosePaginate = require('mongoose-paginate');

var AgentChatSchema = new Schema({
    applicationId: String
}, { strict: false, collection: "agentchats" });
AgentChatSchema.plugin(mongoosePaginate);
let agentChats = mongoose.model("agentchats", AgentChatSchema);
module.exports = agentChats;