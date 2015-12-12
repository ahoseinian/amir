'use strict';
var express = require('express');
var router = express.Router();
var fs = require('fs');
var lwip = require('lwip');
var Purchase = require('../models/purchase');



/* GET home page. */
router.get('/', function(req, res, next) {
	Purchase.find(function(err, purchases){
		if(err){ return next(err); }

		res.json(purchases);
	})
});

router.get('/:id', function(req, res, next) {
  Purchase.findOne({_id: req.params.id}, function(err, purchase){
    if(err){ return next(err); }

    res.json(purchase);
  })
});

router.post('/', function(req, res, next) {
  var purchase = new Purchase(req.body);
  Purchase.findOne({ _model: purchase._model }, {}, { sort: '-code'}, function(err, lastPurchase){
    var lastCode = lastPurchase ? lastPurchase.code : 0;
    purchase.code = lastCode + 1;    
    purchase.save(function(err, purchase){
      if(err){ return next(err); }
      Purchase
        .populate(purchase, [{path: "_customer"},{path: "_product"}], 
        function(err, purchase){
          res.json(purchase);
        });
    });
  });
});

router.delete('/:id', function(req, res, next){
	Purchase.remove({ _id: req.params.id }, function(err, removed){
		if(err){ next(err); }
		res.json(removed);
	})
});

router.put('/:id', function(req, res, next) {
  Purchase.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, purchase){
    if(err){ return next(err); }
    Purchase.populate(purchase, 
      [{path: "_customer"},{path: "_product"}],
      function(err, purchase){
        if(err){ return next(err); }
        res.json(purchase);
      });
  });
});

module.exports = router;
