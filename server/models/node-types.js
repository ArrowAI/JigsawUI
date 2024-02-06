let mongoose = require("./../config/mongooseDB");
let Schema = mongoose.Schema;
let environment = process.env.NODE_ENV;
let mongoosePaginate = require('mongoose-paginate');

var NodeTypeSchema = new Schema({
    _id: Schema.ObjectId,
    applicationId: String
}, { strict: false, collection: "nodeTypes" });
NodeTypeSchema.plugin(mongoosePaginate);
let nodeTypes = mongoose.model("nodeTypes", NodeTypeSchema);


module.exports = nodeTypes;