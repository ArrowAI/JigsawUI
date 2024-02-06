let mongoose = require("./../config/mongooseDB");
let Schema = mongoose.Schema;
let environment = process.env.NODE_ENV;
let mongoosePaginate = require('mongoose-paginate');

var Credential = new Schema({
    _id: Schema.ObjectId,
    applicationId: String
}, { strict: false, collection: "credentials" });
Credential.plugin(mongoosePaginate);
let credential = mongoose.model("credentials", Credential);


module.exports = credential;