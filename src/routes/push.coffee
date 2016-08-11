express = require 'express'
router = express.Router()
request = require 'request'

config = require '../../../config.json'

env = if process.env.ENV is 'prod' then 'prod' else 'dev'

push_protocol = if env is 'dev' then config.product.push.dev.protocol else config.product.push.production.protocol
push_domain = if env is 'dev' then config.product.push.dev.domain else config.product.push.production.domain
push_id = if env is 'dev' then config.product.push.dev.id else config.product.push.production.id

router.get '/', (req, res) ->
  res.json
    'api_domain': push_domain

router.post '*', (req, res) ->

  requester = null
  url = push_protocol + push_domain + '/' + push_id + req.url

  isMultipart = JSON.stringify(req.headers).indexOf('multipart/form-data')

  if isMultipart isnt -1
    requester = request.post({
      uri: url
      formData : req.body
      }, (error, response, body) ->
      if error
        console.error 'Refused connection ' + error.code
        res.status(503).send({ error: 'Can\'t connect to Push' }).end
      return)

  else
    requester = request.post({
      uri: url
      json: req.body
      }, (error, response, body) ->
      if error
        console.error 'Refused connection ' + error.code
        res.status(503).send({ error: 'Can\'t connect to Push' }).end
      return)

  if env is 'dev'
    res.append 'x-api-endpoint', url

  req.pipe(requester).pipe res
  return

router.put '*', (req, res) ->

  requester = null
  url = push_protocol + push_domain + '/' + push_id + req.url

  requester = request.put({
    uri: url
    json: req.body
    }, (error, response, body) ->
    if error
      console.error 'Refused connection ' + error.code
      res.status(503).send({ error: 'Can\'t connect to Push' }).end
    return)

  if env is 'dev'
    res.append 'x-api-endpoint', url

  req.pipe(requester).pipe res
  return

router.get '*', (req, res) ->

  url = push_protocol + push_domain + '/' + push_id + req.url
  requester = null

  requester = request.get({
    uri: url
    }, (error, response, body) ->
    if error
      console.error 'Refused connection ' + error.code
      res.status(503).send({ error: 'Can\'t connect to Push' }).end
    return)

  req.pipe(requester).pipe res
  return

module.exports = router
