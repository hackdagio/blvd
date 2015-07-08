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
request = require 'request'

#routes
routes = require './routes'

# config - this is essential
config = require '../../config.json'
port = if process.env.ENV == 'dev' then config.port.dev else config.port.prod
env = if process.env.ENV == 'dev' then 'dev' else 'prod'

## init
debug = require('debug')('express')
app = module.exports = express()

# some config
app.set 'port', port
app.set 'views', '../views'
app.set 'view engine', 'jade'

app.use compress() # enable the gzip compression
app.use bodyParser.urlencoded(extended: true)
app.use bodyParser.json()
app.use methodOverride()
app.use express.static('../public') # declaring public access paths
if env == 'dev'
  app.use morgan('dev')
  app.use(errorHandler())

# reverse proxy to kaizen
app.use '/api', (req, res) ->
  url = config.product.api.protocol + config.product.api.domain + '/' + config.product.api.id + req.url
  r = null

  if req.method == 'POST'
    if req.url == config.product.api.token
      r = request.post({
        uri: url
        form: req.body
        }, (error, response, body) ->
        if error
          console.error 'Refused connection ' + error.code
          res.status(503).send({ error: 'Can\'t connect to Kaizen' }).end
        return)
    else
      r = request.post({
        uri: url
        json: req.body
        }, (error, response, body) ->
        if error
          console.error 'Refused connection ' + error.code
          res.status(503).send({ error: 'Can\'t connect to Kaizen' }).end
        return)
  else
    r = request.get({
      uri: url
      }, (error, response, body) ->
      if error
        console.error 'Refused connection ' + error.code
        res.status(503).send({ error: 'Can\'t connect to Kaizen' }).end
      return)

  req.pipe(r).pipe res
  return

# app routes
app.get '/', routes.index
app.get '/partials/*', routes.partials
app.get '/favicon.ico', routes.favicon
app.get '/download', routes.avenue
app.get '*', routes.index

# Error handlers
process.on 'uncaughtException', (err) ->
  console.error 'uncaughtException: ' + err.message
  console.error err.stack
  console.log 'err'
  # exit with error
  return

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
