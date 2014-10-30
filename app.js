var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  errorHandler = require('errorhandler'),
  morgan = require('morgan'),
  routes = require('./routes'),
  partials = require('./routes/partials'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();

/** 
Config -- all envs
**/

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
var env = process.env.NODE_ENV || 'dev';

// development only
if (env === 'dev') { app.use(errorHandler()); }
// production only
if (env === 'production') { }


/** 
Routes 
**/

app.use('/', routes);
app.use('/partials', partials);
app.use('/api', api);

// Redirect all others to the index (HTML5 history)
app.get('*', function(req, res, next) {
  res.render('index');
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'dev') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


// CORS inbound
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST","PUT");
  next();
});

module.exports = app;