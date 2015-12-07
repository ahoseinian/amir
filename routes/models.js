var express = require('express');
var router = express.Router();
var Model = require('../models/model');
var Product = require('../models/product');

/* GET models listing. */
router.get('/', function(req, res, next) {
	Model.find(function(err, models){
		if(err){next(err)};
		res.json(models);
	})
});

router.get('/:id', function(req, res, next){
  Model.findOne({ _id: req.params.id }, function (err, model) {
    if (err){ next(err) };
    Product.find({_model: model._id}, function(err, products){
      model.products = products;
      res.json(model);
    })
  });
});

router.get('/by/name/:name', function(req, res, next){
  Model.findOne({ name: req.params.name }, function (err, model) {
    if (err){ next(err) };
    Product.find({_model: model._id}, function(err, products){
      model.products = products;
      res.json(model);
    })
  });
});

router.post('/', function(req, res, next) {
  var model = new Model(req.body);

  model.save(function(err, model){
    if(err){ return next(err); }
    res.json(model);
  });
});

router.post('/:id/infos/:type', function(req, res, next) {
  Model.findOne({_id: req.params.id}, function(err, model){
    if(err){ next(err) }

    model.infos[req.params.type].push(req.body);
    model.save(function(err, model){
      if(err){ return next(err); }
      res.json(model);
    });
  });
});

router.delete('/:id', function(req, res, next){
	Model.remove({_id: req.params.id },function(err, removed){
		if(err){ next(err); }
		res.json(removed);
	})
});

router.delete('/:id/infos/:type/:infoId', function(req, res, next){
  Model.findOne({_id: req.params.id}, function(err, model){
    if(err){ next(err) }

    model.infos[req.params.type].id(req.params.infoId).remove();
    model.save(function(err, model){
      if(err){ return next(err); }
      res.json(model);
    });
  });
});

router.put('/:id', function(req, res, next) {
  Model.update({_id: req.params.id}, req.body, function(err, model){
    if(err){ return next(err); }
    res.json(model);
  });
});

module.exports = router;
