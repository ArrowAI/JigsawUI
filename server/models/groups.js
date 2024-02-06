let mongoose = require("../config/mongooseDB");
let Schema = mongoose.Schema;
let environment = process.env.NODE_ENV;
let mongoosePaginate = require('mongoose-paginate');

var GroupSchema = new Schema({
  applicationId: String
}, { strict: false, collection: "user_groups" }, {
  timestamps: true
});
GroupSchema.plugin(mongoosePaginate);
let Groups = mongoose.model("user_groups", GroupSchema);
module.exports = Groups;