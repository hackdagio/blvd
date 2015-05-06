###!
# Boulevard
# The Kaizen webclient
# by Ignacio Trujillo <itrujillo@conceptogroup.cl, ignaces@ignac.es>
# (c) 2015 Concepto Group
#
# http://www.conceptogroup.cl
# https://github.com/gnaces
###


#/ loading dependencies
express = require 'express'
bodyParser = require 'body-parser' 
methodOverride = require 'method-override' 
errorHandler = require 'errorhandler' 
morgan = require 'morgan' 
http = require 'http' 
stylus = require 'stylus' 
nib = require 'nib' 
compress = require 'compression' 

#/ loading routes
routes = require './routes' 

#/ loading config
config = require '../../config.json' 

#/ initializing app
debug = require('debug')('express')
app = module.exports = express()

#/ function to compile stylus as-you-go
compile = (str, path) ->
  stylus(str).set('compress', true).set('filename', path).use nib()

#/ app settings
app.set 'port', process.env.PORT or config.port #port
app.set 'views', '../views'
app.set 'view engine', 'jade'
app.use stylus.middleware(
  src: '../*'
  dest: '../public'
  compile: compile) # using the function to compile stylus files
app.use morgan('dev')
app.use bodyParser.urlencoded(extended: true)
app.use bodyParser.json()
app.use methodOverride()
app.use compress()
app.use express.static('../public') # declaring public access paths

#/ app routes
app.get '/', routes.index
app.get '/partials/*', routes.partials
app.get '*', routes.index

#/ Error handlers
# development error handler
# will print stacktrace
if app.get('env') == 'dev'
  app.use (err, req, res, next) ->
    res.status err.status or 500
    res.render 'error',
      message: err.message
      error: err
    return

#/ production error handler
# no stacktraces leaked to user
app.use (err, req, res, next) ->
  res.status err.status or 500
  res.render 'error',
    message: err.message
    error: {}
  return

#/ booting up the app
http.createServer(app).listen app.get('port'), ->
  console.log config.app.name + ' "' + config.product.name + ' ~ ' + config.product.company + '" running at ' + app.get('port')
  return

#/ scooping the modules
module.exports = app