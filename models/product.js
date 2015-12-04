var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  name: {type: String, required: true},
  weight: String
}, { timestamps: { createdAt: 'created_at' }});

module.exports = mongoose.model('Product', ProductSchema);