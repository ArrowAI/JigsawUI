let mongoose = require("./../config/cosmoDB");
let Schema =  mongoose.Schema;

let mongoosePaginate = require('mongoose-paginate');
let mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
let applicationEvents = new Schema({
    // _id: Schema.ObjectId,
    // app_id: {type: String, index: true},
    // filters: Schema.Types.Mixed
}, { strict: false,timestamps: true});
applicationEvents.plugin(mongoosePaginate);
applicationEvents.plugin(mongooseAggregatePaginate);
let events = mongoose.model("application_events", applicationEvents);
module.exports = events;