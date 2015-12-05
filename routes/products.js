var express = require('express');
var router = express.Router();
var fs = require('fs');
var Product = require('../models/product');


function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) { return new Error('Invalid input string'); }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}

function writeImage(path, data){
  var imageBuffer = decodeBase64Image(data);

  fs.writeFile(path, imageBuffer.data, function(err) {
    console.log(err);
  });
}

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
    if(req.body.image){ writeImage(__dirname + '/../storage/images/products/'+ product._id +'.jpg', req.body.image); }

    res.json(product);
  });
});

router.delete('/:id', function(req, res, next){
	Product.remove({_id: req.params.id },function(err, removed){
		if(err){ next(err); }
    fs.unlink(__dirname + '/../storage/images/products/'+ req.params.id +'.jpg', function(err){return console.error(err); });

		res.json(removed);
	})
});

router.put('/:id', function(req, res, next) {
  Product.update({_id: req.params.id}, req.body, function(err, product){
    if(err){ return next(err); }
    if(req.body.image){ writeImage(__dirname + '/../storage/images/products/'+ req.params.id +'.jpg', req.body.image); }

    res.json(product);
  });
});

module.exports = router;
