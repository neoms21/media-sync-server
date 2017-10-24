var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    sex: String,
    age: Number,
    country: String,
    dateCreated: Date
});

module.exports = userSchema;
