/**
 * Created by Ravinder on 11/28/2017.
 */
var mongoose = require("./../config/mongooseDB");
var Schema = mongoose.Schema;

// TODO: Add schema
var application = new Schema({
}, {strict: false, collection:'application'});

var Application = mongoose.model("application",application);

module.exports = Application;
