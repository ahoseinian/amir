var express = require('express');
var router = express.Router();
var fs = require('fs');
var lwip = require('lwip');
var Product = require('../models/product');


function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) return new Error('Invalid input string');

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}

function writeImage(path, data, callback){
  var imageBuffer = decodeBase64Image(data);

  require('lwip').open(imageBuffer.data, 'jpeg', function(err, image){
    image.resize(200, function(err, image){
      image.writeFile(path, function(err){
        if(err){console.log(err)};
        typeof callback === 'function' && callback();
      });
    });
  });
}

/* GET home page. */
router.get('/', function(req, res, next) {
	Product.find(function(err, products){
		if (err) return next(err);

		res.json(products);
	})
});

router.get('/:id', function(req, res, next) {
  Product.findOne({_id: req.params.id}, function(err, product){
    if (err) return next(err);

    res.json(product);
  })
});

router.post('/', function(req, res, next) {
  var image = req.body.image;
  delete req.body.image;
  var product = new Product(req.body);

  product.save(function(err, product){
    if (err) return next(err);
    if(image){ 
      writeImage(__dirname + '/../storage/images/products/'+ product._id +'.jpg', image, function(){
        res.json(product);
      }); 
    }else{
      res.json(product);
    }
  });
});

router.delete('/:id', function(req, res, next){
	Product.remove({_id: req.params.id },function(err, removed){
		if (err) return next(err);
    fs.unlink(__dirname + '/../storage/images/products/'+ req.params.id +'.jpg', function(err){
      if(err) next(err);
    });

		res.json(removed);
	})
});

router.put('/:id', function(req, res, next) {
  var image = req.body.image;
  delete req.body.image;

  Product.update({_id: req.params.id}, req.body, function(err, product){
    if (err) return next(err);
    if (image) { 
      writeImage(__dirname + '/../storage/images/products/'+ req.params.id +'.jpg', image, function(){
        res.json(product);
      }); 
    } else {
      res.json(product);
    }

  });
});

module.exports = router;
