let mongoose = require("./../config/mongooseDB");
let Schema = mongoose.Schema;
let environment = process.env.NODE_ENV;
let mongoosePaginate = require('mongoose-paginate');

var CredentialType = new Schema({
    _id: Schema.ObjectId,
    applicationId: String
}, { strict: false, collection: "credentialTypes" });
CredentialType.plugin(mongoosePaginate);
let credentialType = mongoose.model("credentialTypes", CredentialType);


module.exports = credentialType;