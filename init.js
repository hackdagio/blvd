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
var routes = require('./routes');

// config file
var config = require('../app/config.json');

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
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');
app.use(stylus.middleware({
  src: __dirname + '../app/',
  dest: __dirname + '../app/public',
  compile: compile
  }
));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(compress());

// declaring public access paths
app.use('/js', express.static(__dirname + '../app/scripts'));
app.use(express.static(__dirname + '../app/public'));


/// Serve index and view partials

app.get('/', routes.index);
app.get('/partials/*', routes.partials);
app.get('*', routes.index);


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
http.createServer(app).listen(app.get('port'), function () {
  console.log(config.app.name + ' "' + config.product.name + ' ~ ' + config.product.company + '" running at ' + app.get('port'));
});

module.exports = app;