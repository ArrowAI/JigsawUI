let mongoose = require("../config/mongooseDB");
let Schema = mongoose.Schema;
let environment = process.env.NODE_ENV;
let mongoosePaginate = require('mongoose-paginate');

var AgentsSchema = new Schema({
    applicationId: String
}, { strict: false, collection: "agents" },{
    timestamps: true
  });
AgentsSchema.plugin(mongoosePaginate);
let Agents = mongoose.model("agents", AgentsSchema);
module.exports = Agents;