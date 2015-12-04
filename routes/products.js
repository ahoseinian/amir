var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = mongoose.model('Product');


router.param('product', function(req, res, next, id) {
  var query = Product.findById(id);

  query.exec(function (err, product){
    if (err) { return next(err); }
    if (!product) { return next(new Error('can\'t find product')); }

    req.product = product;
    return next();
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
	Product.find(function(err, products){
		if(err){ return next(err); }

		res.json(products);
	})
});

router.post('/', function(req, res, next) {
  var product = new Product(req.body);

  product.save(function(err, product){
    if(err){ return next(err); }

    res.json(product);
  });
});

router.delete('/:product', function(req, res, next){
	req.product.remove(function(err, removed){
		if(err){ next(err); }

		res.json(removed);
	})
});

router.put('/:product', function(req, res, next) {

  req.product.update(req.body, function(err, product){
    if(err){ return next(err); }

    res.json(product);
  });
});

module.exports = router;
