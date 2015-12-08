var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, uniqueValidator = require('mongoose-unique-validator');

var ProductSchema = new Schema({
  code: {type: String, required: true, unique: true},
  _model: {type: Schema.Types.ObjectId, ref: 'Model'}
}, { timestamps: { createdAt: 'created_at' }, strict: false});

ProductSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Product', ProductSchema);