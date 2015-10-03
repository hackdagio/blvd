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

# demo port
if process.env.ENV is 'dev'
  env = 'dev'
  port = config.port.dev
else if process.env.ENV is 'demo'
  env = 'dev' # fuck yes
  port = config.port.demo
else
  env = 'prod'
  port = config.port.prod

## init
debug = require('debug')('express')
app = module.exports = express()

# some config
app.set 'port', port

# @ 0.7.0
# now using EJS to render RAW html generated by Jade.
app.engine '.html', require('ejs').renderFile
app.set 'view engine', 'html'
app.set 'views', '../public/views'

app.use compress() # enabling the gzip compression
app.use bodyParser.urlencoded(extended: true)
app.use bodyParser.json()
app.use methodOverride()
app.use express.static('../public') # declaring public access path

# using console logs if dev mode is on
if env == 'dev'
  app.use morgan('dev')
  app.use(errorHandler())


# reverse proxy to kaizen api
app.use '/api', (req, res) ->

  if env == 'dev'
    api_protocol = config.product.api.dev.protocol
    api_domain = config.product.api.dev.domain
    api_id = config.product.api.dev.id
    api_token_endpoint = config.product.api.dev.token

  else
    api_protocol = config.product.api.production.protocol
    api_domain = config.product.api.production.domain
    api_id = config.product.api.production.id
    api_token_endpoint = config.product.api.production.token

  url = api_protocol + api_domain + '/' + api_id + req.url
  token = api_token_endpoint
  r = null

  # this is an ugly if_ is to handle a not-so-well implemented endpoint
  if req.method == 'POST'
    vari = JSON.stringify(req.headers).indexOf('multipart/form-data')

    if req.url == token
      r = request.post({
        uri: url
        form: req.body
        }, (error, response, body) ->
        if error
          console.error 'Refused connection ' + error.code
          res.status(503).send({ error: 'Can\'t connect to Kaizen' }).end
        return)

    else if vari isnt -1
      r = request.post({
        uri: url
        formData : req.body
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

  if env == 'dev'
    res.append 'x-api-endpoint', url
  else
    res.append 'x-api-endpoint', api_id

  req.pipe(r).pipe res
  return

# app routes
app.get '/', routes.index
app.get '/partials/*', routes.partials
app.get '/favicon.ico', routes.favicon
app.get '/download', routes.avenue
app.get '/robots.txt', routes.robots
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
