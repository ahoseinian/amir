var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var ProductSchema = new Schema({
  code: {type: String, required: true},
  _model: {type: Schema.Types.ObjectId, ref: 'Model'}
}, { timestamps: { createdAt: 'created_at' }, strict: false});


module.exports = mongoose.model('Product', ProductSchema);