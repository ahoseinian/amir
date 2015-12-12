var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('./passport');
var session = require('express-session');
var mongoose = require('mongoose');
var assetsManager = require('./config/assets');
mongoose.connect('mongodb://localhost/amir');



var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'storage')));
app.use(assetsManager.middleWare);

app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({limit: '1mb', extended: true}));

app.use(passport.initialize());
app.use(passport.session());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


var index = require('./routes/index');
var users = require('./routes/users');
var products = require('./routes/products');
var models = require('./routes/models');
var customers = require('./routes/customers');
var purchases = require('./routes/purchases');

app.use('/', index);
app.use('/api/users', passport.authenticate('basic'), users);
app.use('/api/customers', passport.authenticate('basic'), customers);
app.use('/api/products', passport.authenticate('basic'), products);
app.use('/api/models', passport.authenticate('basic'), models);
app.use('/api/purchases', passport.authenticate('basic'), purchases);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// my error handler
app.use(function(err, req, res, next){
  if(err.code == 11000){
    err.status = 409;
  }else if(err.name == 'ValidationError'){
    err.status = 400;
  }

  next(err);
});


app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json(err);
});



module.exports = app;
