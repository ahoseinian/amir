var express = require('express');
var router = express.Router();
var passport = require('../config/passport');

router.use( '/api/users', passport.authenticate('basic'), require('./users') );
router.use( '/api/customers', passport.authenticate('basic'), require('./customers') );
router.use( '/api/products', passport.authenticate('basic'), require('./products') );
router.use( '/api/models', passport.authenticate('basic'), require('./models') );
router.use( '/api/purchases', passport.authenticate('basic'), require('./purchases') );

/* GET home page. */
router.get('/', function(req, res, next) {
	var user = ((req.session.passport || {}).user);
  res.render('index', {user: user, title: 'Salar'});
});

module.exports = router;
