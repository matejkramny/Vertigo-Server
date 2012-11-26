var express = require('express')
, http = require('http')
, path = require('path');

exports.express = express();
exports.http = http;
exports.path = path;

var mongo = require('mongoskin');
exports.db = mongo.db('localhost/vertigoworlds', { safe: true });
exports.WorldsProvider = require('./WorldsProvider').WorldsProvider;

exports.routes = require('./routes');

var app = express();
exports.app = app;

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});
