/**
 * Created by Ravinder on 11/28/2017.
 */
var mongoose = require("./../config/mongooseDB");
var Schema = mongoose.Schema;

var application = new Schema({

}, {strict: false, collection:'addons'});

var Application = mongoose.model("addons",application);

module.exports = Application;
