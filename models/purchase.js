var mongoose = require('mongoose'), 
	mongoosePaginate = require('mongoose-paginate'), 
	Schema = mongoose.Schema;

var PurchaseSchema = new Schema({
  code: {type: Number, required: true},
  _model: {type: Schema.Types.ObjectId, ref: 'Model', required: true},
  _customer: {type: Schema.Types.ObjectId, ref: 'Customer', required: true},
  _product: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
}, { timestamps: { createdAt: 'created_at' }, strict: false});

PurchaseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Purchase', PurchaseSchema);