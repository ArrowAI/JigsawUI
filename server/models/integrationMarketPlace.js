let mongoose = require("../config/mongooseDB");
let Schema = mongoose.Schema;
let environment = process.env.NODE_ENV;
let mongoosePaginate = require('mongoose-paginate');

var IntegrationSchema = new Schema({
    _id: Schema.ObjectId,
    applicationId: String
}, { strict: false, collection: "integrationMarketPlace" });
IntegrationSchema.plugin(mongoosePaginate);
let integrations = mongoose.model("integrationMarketPlace", IntegrationSchema);
module.exports = integrations;