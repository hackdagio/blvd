###!
# Boulevard
# by Ignacio Trujillo <itrujillo@conceptogroup.cl, ignaces@ignac.es>
# (c) 2015 Concepto Group
#
# http://www.conceptogroup.cl
# https://github.com/gnaces
###

# dependencies
express = require 'express'
bodyParser = require 'body-parser'
methodOverride = require 'method-override'
errorHandler = require 'errorhandler'
morgan = require 'morgan'
http = require 'http'
compress = require 'compression'

#routes
routes = require './routes'

# config - this is essential
config = require '../../config.json'
port = if process.env.ENV == 'dev' then config.port.dev else config.port.prod
env = if process.env.ENV == 'dev' then 'dev' else 'prod'

## init
debug = require('debug')('express')
app = module.exports = express()

app.set 'port', port
app.set 'views', '../views'
app.set 'view engine', 'jade'
app.use bodyParser.urlencoded(extended: true)
app.use bodyParser.json()
app.use methodOverride()
app.use compress()
app.use express.static('../public') # declaring public access paths
if env == 'dev'
  app.use morgan('dev')
  app.use(errorHandler())

# app routes
app.get '/', routes.index
app.get '/partials/*', routes.partials
app.get '/favicon.ico', routes.favicon
app.get '*', routes.index

# Error handlers
# development error handler
# will print stacktrace
if env == 'dev'
  app.use (err, req, res, next) ->
    res.status err.status or 500
    res.render 'error',
      message: err.message
      error: err
    return
else
  # production error handler
  # no stacktraces leaked to user
  app.use (err, req, res, next) ->
    res.status err.status or 500
    res.render 'error',
      message: err.message
      error: {}
    return


# starting up
http.createServer(app).listen port, ->
  console.log config.app.name + ' "' + config.product.name + '"'
  console.log 'running at ' + port
  console.log '\x1b[36m', env + ' mode', '\x1b[0m'
  return

module.exports = app