var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    morgan = require('morgan'),
    http = require('http'),
    stylus = require('stylus'),
    nib = require('nib'),
    compress = require('compression'),

    // routes
    routes = require('./routes'),
    partials = require('./routes/partials');

var debug = require('debug')('express');
var app = module.exports = express();

// compile .styl files
function compile(str, path) {
  return stylus(str)
    .set('compress', true)
    .set('filename', path)
    .use(nib())
}

/// config
app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(stylus.middleware(
  { src: __dirname + '/',
    dest: __dirname + '/public',
    compile: compile
  }
));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(compress());
app.use(express.static(__dirname + '/public'));

// routes
app.use('/', routes);
app.use('/partials', partials);


/// redirect all others to the index (html5 history)
app.get('*', function(req, res, next) {
  res.render('index');
});


/// error handlers

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


/// runtime
var server = app.listen(app.get('port'), function () {
  console.log('Kaizen listening on port ' + server.address().port);
});


module.exports = app;