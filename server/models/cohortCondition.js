let mongoose = require("./../config/mongooseDB");
let Schema = mongoose.Schema;
let environment = process.env.NODE_ENV;
// let mongoosePaginate = require('mongoose-paginate');

let cohortConditionSchema = new Schema(
    {
    _id: Schema.ObjectId,
    app_id: {type: String, index: true},
    filters: Schema.Types.Mixed
}, 
{ strict: false, collection: "cohortCondition" });
let CohortCondition = mongoose.model("cohortCondition", cohortConditionSchema);
module.exports = CohortCondition;