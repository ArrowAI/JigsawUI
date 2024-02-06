var mongoose = require("./../config/mongooseDB");
var Schema = mongoose.Schema;
var environment = process.env.NODE_ENV;
// var mongoosePaginate = require('mongoose-paginate');

var applicationKeySchema = new Schema({
    app_id: {type: String, index: true},
    key: {type: String, index: true},
    isactive: {type: Boolean, default: false}
}, { strict: false, collection: "applications_key" });
// applicationKeySchema.plugin(mon"goosePaginate);
var applicationKey = mongoose.model("applications_key", applicationKeySchema);
module.exports = applicationKey;