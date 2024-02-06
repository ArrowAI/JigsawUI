/**
 * Created by Ravinder on 11/28/2017.
 */
var mongoose = require("./../config/mongooseDB");
var Schema = mongoose.Schema;

// TODO: Add schema
var bots = new Schema({

}, {strict: false, collection:'bots'});

var Bots = mongoose.model("bots",bots);

module.exports = Bots;
