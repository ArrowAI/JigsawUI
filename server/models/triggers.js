var mongoose = require("../config/mongooseDB");
var Schema = mongoose.Schema;
var environment = process.env.NODE_ENV;

var triggers = new Schema({
    bot_id: {type: Schema.Types.ObjectId, index: false},
    type: {type: Schema.Types.Mixed, index: false},
    patterns: {type: Schema.Types.Mixed, index: false},
    flow: {type: Schema.Types.Mixed, index: false},
    flow_name: {type: Schema.Types.Mixed, index: false},
    score: {type: Schema.Types.Mixed, index: false},
    states: {type: Schema.Types.Mixed, index: false},
    re_continue: {type: Schema.Types.Mixed, index: false}
}, { strict: false, collection:'triggers' });

var triggers = mongoose.model("triggers", triggers);

module.exports = triggers;