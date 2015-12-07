var express = require('express');
var router = express.Router();
var Customer = require('../models/customer');

/* GET users listing. */
router.get('/', function(req, res, next) {
	Customer.find(function(err, users){
		if(err){next(err)};
		res.json(users);
	})
});

router.post('/', function(req, res, next) {
  var user = new Customer(req.body);

  user.save(function(err, user){
    if(err){ return next(err); }
    res.json(user);
  });
});

router.delete('/:id', function(req, res, next){
	Customer.remove({_id: req.params.id },function(err, removed){
		if(err){ next(err); }
		res.json(removed);
	})
});

router.put('/:id', function(req, res, next) {
  Customer.update({_id: req.params.id}, req.body, function(err, user){
    if(err){ return next(err); }
    res.json(user);
  });
});

module.exports = router;
