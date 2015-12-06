var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var user = ((req.session.passport || {}).user);
  res.render('index', {user: user, title: 'Salar'});
});

module.exports = router;
