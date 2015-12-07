var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ModelSchema = new Schema({
  name: {type: String, required: true},
  infos: {
		product: [{ name: String }],
		purchase: [{ name: String }],
	},
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

module.exports = mongoose.model('Model', ModelSchema);