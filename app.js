var config = require('./config')
, routes = config.routes
, worldsProvider = config.WorldsProvider;

config.app.get('/', routes.getAll);
config.app.get('/:id', routes.getOne);
config.app.get('/download/:id', routes.downloadWorld);

config.http.createServer(config.app).listen(config.app.get('port'), function(){
  console.log("Express server listening on port " + config.app.get('port'));
});
