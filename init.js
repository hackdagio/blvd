/*!
 * Boulevard
 * The Kaizen webclient
 * by Ignacio Trujillo <itrujillo@conceptogroup.cl, ignaces@ignac.es>
 * (c) 2015 Concepto Group
 *
 * http://www.conceptogroup.cl
 * https://github.com/gnaces
 */

/// Vars

// modules
var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    morgan = require('morgan'),
    http = require('http'),
    stylus = require('stylus'),
    nib = require('nib'),
    compress = require('compression');

// routes
var access = require('./routes/access');
var partials = require('./routes/partials');

// config file
var config = require('./config.json');

// debug
var debug = require('debug')('express');
var app = module.exports = express();


/// Functions

// compile stylus
function compile(str, path) {
  return stylus(str)
    .set('compress', true)
    .set('filename', path)
    .use(nib())
}


/// App Config

app.set('port', process.env.PORT || config.port);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(stylus.middleware({
  src: __dirname + '/',
  dest: __dirname + '/public',
  compile: compile
  }
));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(compress());

// declaring public access paths
app.use('/js', express.static(__dirname + '/scripts'));
app.use(express.static(__dirname + '/public'));


/// General express routing

app.use('/partials', partials);

app.get('/', function(req, res) {
  res.render('index', { title: config.product.name });
});

app.get('/login', access.login);
app.get('/signup', access.signup);
app.get('/request-access', access.request);

// the 404 route (ALWAYS keep this as the last route)
app.get('*', function(req, res){
  res.send('error', 404);
});


/// Error handlers

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
};

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


/// Runtime

var server = app.listen(app.get('port'), function () {
  console.log(config.app.name + ' "' + config.product.name + ' ~ ' + config.product.company + '" running at ' + app.get('port'));
});

module.exports = app;