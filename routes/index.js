var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/private', passport.authenticate('basic'), function(req, res) {
    res.json(req.user);
});

module.exports = router;
