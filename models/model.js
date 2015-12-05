var mongoose = require('mongoose');

var ModelSchema = new mongoose.Schema({
  name: {type: String, required: true},
  product_infos: [{ name: String }],
});

module.exports = mongoose.model('Model', ModelSchema);