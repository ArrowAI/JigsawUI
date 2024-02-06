let mongoose = require("../config/mongooseDB");
let Schema = mongoose.Schema;
let environment = process.env.NODE_ENV;
let mongoosePaginate = require('mongoose-paginate');

var ElementSchema = new Schema({
    applicationId: String
}, { strict: false, collection: "elements" },{
    timestamps: true
  });
ElementSchema.plugin(mongoosePaginate);
let elements = mongoose.model("elements", ElementSchema);
module.exports = elements;