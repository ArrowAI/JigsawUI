let mongoose = require("../config/mongooseDB");
let Schema = mongoose.Schema;
let environment = process.env.NODE_ENV;
let mongoosePaginate = require('mongoose-paginate');

var WorkFlowSchema = new Schema({
    applicationId: String
}, { strict: false, collection: "scheduler" });
WorkFlowSchema.plugin(mongoosePaginate);
let workflows = mongoose.model("scheduler", WorkFlowSchema);
module.exports = workflows;