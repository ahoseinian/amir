var mongoose = require('mongoose');

var ModelSchema = new mongoose.Schema({
  name: {type: String, required: true},
});

module.exports = mongoose.model('Model', ModelSchema);