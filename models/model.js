var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ModelSchema = new Schema({
  name: {type: String, required: true},
  product_infos: [{ name: String }],
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

module.exports = mongoose.model('Model', ModelSchema);