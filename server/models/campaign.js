/**
 * Created by Ravinder on 11/28/2017.
 */
var mongoose = require("../config/mongooseDB");
var Schema = mongoose.Schema;

// TODO: Add schema
var campaignSchema = new Schema({

}, { strict: false, collection: 'campaign' });

var campaign = mongoose.model("campaign", campaignSchema);

module.exports = campaign;