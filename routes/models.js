var express = require('express');
var router = express.Router();
var Model = require('../models/model');
var Product = require('../models/product');
var Purchase = require('../models/purchase');

/* GET models listing. */
router.get('/', function(req, res, next) {
	Model.find({}).sort('name').exec(function(err, models){
    if(err){next(err)};
    res.json(models);
  });
});

router.get('/:id', function(req, res, next){
  Model.findOne({ _id: req.params.id }, function (err, model) {
    if (err){ next(err) };
    res.json(model);
  });
});


router.post('/', function(req, res, next) {
  var model = new Model(req.body);

  model.save(function(err, model){
    if(err){ return next(err); }
    res.json(model);
  });
});

router.post('/:id/infos/:type/:tag', function(req, res, next) {
  Model.findOne({_id: req.params.id}, function(err, model){
    if(err){ next(err) }

    model.infos[req.params.type][req.params.tag].push(req.body);

    model.save(function(err, model){
      if(err){ return next(err); }
      res.json(model);
    });
  });
});

router.put('/:id/infos/:type/:tag', function(req, res, next) {
  Model.findOne({_id: req.params.id}, function(err, model){
    if(err){ next(err) }

    model.infos[req.params.type][req.params.tag].id(req.body._id).remove(function(err){
      if(err){ return next(err) }
      model.infos[req.params.type][req.params.tag].push(req.body);
    });
  
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

router.delete('/:id/infos/:type/:tag/:infoId', function(req, res, next){
  Model.findOne({_id: req.params.id}, function(err, model){
    if(err){ next(err) }

    model.infos[req.params.type][req.params.tag].id(req.params.infoId).remove();
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



//products
router.get('/:id/products/page/:page?', function(req, res, next){
  var page = req.params.page || 1;
  Model.findOne({ _id: req.params.id }, function (err, model) {
    if (err){ next(err) };
    Product.paginate({_model: model._id}, {page:page, limit:4, sort:'-code'}).then(function(result){
      model.products = result.docs;
      delete result.docs;
      res.json({model: model, paginate: result});
    });
  });
});

router.get('/:id/products/:pcode', function(req, res, next){
  Product.findOne({ 
    code: req.params.pcode,
    _model: req.params.id,
  }).exec(function(err, product){
    if(err){ next(err) };
    res.json(product);
  });
});



router.post('/:id/products/search/:page?', function(req, res, next){
  var page = req.params.page || 1;
  Model.findOne({ _id: req.params.id }, function (err, model) {
    if (err){ next(err) };
    req.body._model = model._id;
    Product.paginate(req.body, {page:page, limit:4, sort:'-code'}).then(function(result){
      model.products = result.docs;
      delete result.docs;
      res.json({model: model, paginate: result});
    })
  });
});

//purchases

router.get('/:id/purchases/:page?', function(req, res, next){
  var page = req.params.page || 1;
  Model.findOne({ _id: req.params.id }, function (err, model) {
    if (err){ next(err) };
    Purchase.paginate({_model: model._id}, { 
      page: page, 
      limit: 4, 
      sort: '-code', 
      populate: ['_customer', '_product'],
    }).then(function(result){
      model.purchases = result.docs;
      delete result.docs;
      res.json({model: model, paginate: result});
    });
  });
});


router.post('/:id/purchases/search/:page?', function(req, res, next){
  var page = req.params.page || 1;
  Model.findOne({ _id: req.params.id }, function (err, model) {
    if (err){ next(err) };
    req.body._model = model._id;
    Purchase
      .paginate(req.body, {
        page:page, 
        limit:4, 
        sort:'-code',
        populate: ['_customer', '_product'],
      }).then(function(result){
        model.purchases = result.docs;
        delete result.docs;
        res.json({model: model, paginate: result});
      })
  });
});

module.exports = router;
