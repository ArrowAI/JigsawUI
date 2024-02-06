let mongoose = require("../config/mongooseDB");
let Schema = mongoose.Schema;
let environment = process.env.NODE_ENV;
let mongoosePaginate = require('mongoose-paginate');

var MultiBotSchema = new Schema({
    applicationId: String
}, { strict: false, collection: "multibot" });
MultiBotSchema.plugin(mongoosePaginate);
let multiBots = mongoose.model("multibot", MultiBotSchema);
module.exports = multiBots;