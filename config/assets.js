'use strict';

var assetmanager = require('assetmanager'),
  obj = {};

var assets = assetmanager.process({
  assets: require('./assets.json'),
  debug: (process.env.NODE_ENV !== 'production'),
  webroot: 'public'
});

obj.middleWare = function (req, res, next) {
  assets.main.js = assets.main.js.map(removeWebRoots);
  assets.main.css = assets.main.css.map(removeWebRoots);

  function removeWebRoots(f){
    return f.replace('bower_components','');
  }
  res.locals = { assets: assets };
  next();
};

module.exports = obj;
