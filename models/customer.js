var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var CustomerSchema = new mongoose.Schema({
  name: {type:String, unique: true},
});
CustomerSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Customer', CustomerSchema);