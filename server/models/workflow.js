let mongoose = require("./../config/mongooseDB");
let Schema = mongoose.Schema;
let environment = process.env.NODE_ENV;
let mongoosePaginate = require('mongoose-paginate');

var WorkFlowSchema = new Schema({
    applicationId: String
}, { strict: false, collection: "workflow" });
WorkFlowSchema.plugin(mongoosePaginate);
let workflows = mongoose.model("workflow", WorkFlowSchema);
module.exports = workflows;