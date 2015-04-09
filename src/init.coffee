###!
# Boulevard
# The Kaizen webclient
# by Ignacio Trujillo <itrujillo@conceptogroup.cl, ignaces@ignac.es>
# (c) 2015 Concepto Group
#
# http://www.conceptogroup.cl
# https://github.com/gnaces
###

#/ modules
express = require('express')
bodyParser = require('body-parser')
methodOverride = require('method-override')
errorHandler = require('errorhandler')
morgan = require('morgan')
http = require('http')
stylus = require('stylus')
nib = require('nib')
compress = require('compression')

# routes
routes = require('./routes')
api = require('./routes/api')

# config file
config = require('../../config.json')
# debug
debug = require('debug')('express')

# express init
app = module.exports = express()


#/ config
compile = (str, path) ->
  stylus(str).set('compress', true).set('filename', path).use nib()

app.set 'port', process.env.PORT or config.port
app.set 'views', '../views'
app.set 'view engine', 'jade'
app.use stylus.middleware(
  src: '../'
  dest: '../public'
  compile: compile)
app.use morgan('dev')
app.use bodyParser.urlencoded(extended: true)
app.use bodyParser.json()
app.use methodOverride()
app.use compress()

# declaring public access paths
app.use express.static('../../public')


#/ routing
app.use '/api', api
app.get '/', routes.index
app.get '/partials/*', routes.partials
app.get '*', routes.index


#/ error handlers
# development error handler

if app.get('env') == 'dev'
  app.use (err, req, res, next) ->
    res.status err.status or 500
    res.render 'error',
      message: err.message
      error: err
    return # will print stacktrace

# production error handler
app.use (err, req, res, next) ->
  res.status err.status or 500
  res.render 'error',
    message: err.message
    error: {}
  return # no stacktraces leaked to user


#/ runtime
http.createServer(app).listen app.get('port'), ->
  console.log config.app.name + ' "' + config.product.name + ' ~ ' + config.product.company + '" running at ' + app.get('port')
  return

#/ exports
module.exports = app