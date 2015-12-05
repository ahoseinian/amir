var express = require('express');
var router = express.Router();
var Model = require('../models/model');

/* GET models listing. */
router.get('/', function(req, res, next) {
	Model.find(function(err, models){
		if(err){next(err)};
		res.json(models);
	})
});

router.post('/', function(req, res, next) {
  var model = new Model(req.body);

  model.save(function(err, model){
    if(err){ return next(err); }
    res.json(model);
  });
});

router.delete('/:id', function(req, res, next){
	Model.remove({_id: req.params.id },function(err, removed){
		if(err){ next(err); }
		res.json(removed);
	})
});

router.put('/:id', function(req, res, next) {
  Model.update({_id: req.params.id}, req.body, function(err, model){
    if(err){ return next(err); }
    res.json(model);
  });
});

module.exports = router;
