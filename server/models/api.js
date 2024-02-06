let mongoose = require("../config/mongooseDB");
let Schema = mongoose.Schema;
let environment = process.env.NODE_ENV;
let mongoosePaginate = require('mongoose-paginate');

var ApiSchema = new Schema({
    applicationId: String
}, { strict: false, collection: "apismodules" });
ApiSchema.plugin(mongoosePaginate);
let apis = mongoose.model("apismodules", ApiSchema);
module.exports = apis;