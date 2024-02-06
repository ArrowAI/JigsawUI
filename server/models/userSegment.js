var mongoose = require("./../config/mongooseDB");
var Schema = mongoose.Schema;
var environment = process.env.NODE_ENV;
var mongoosePaginate = require('mongoose-paginate');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

var CohortUser = new Schema({
    _id:  {type: String},
    unread: Schema.Types.Mixed,
    variable: Schema.Types.Mixed,
    app_id: Schema.Types.ObjectId,
    data: Schema.Types.Mixed,
    lastMessage: Number,
    lastMessageChannel: Schema.Types.Mixed,
    message: Schema.Types.Mixed
}, { strict: false });

CohortUser.plugin(mongoosePaginate);
CohortUser.plugin(mongooseAggregatePaginate);
var cohortUser = mongoose.model("cohort_users", CohortUser);


module.exports = cohortUser;