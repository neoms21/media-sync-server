var mongoose = require('mongoose');

var userSchema = require('./models/user.model');

var db = mongoose.connect("mongodb://localhost:27017/angulartest");

mongoose.model("User", userSchema, "userdata");
module.exports = db;
