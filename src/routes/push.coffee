express = require 'express'
router = express.Router()
request = require 'request'

config = require '../../../config.json'
spec_version = 'application/vnd.kaizen+json'

env = process.env.ENV
api_protocol = config.product.push[env].protocol
api_domain = config.product.push[env].domain
api_version = config.product.push[env].version
api_id = if typeof config.product.api[env].id isnt 'undefined' and config.product.push[env].id? and config.product.push[env].id != "" then '/' + config.product.push[env].id else ''
api_token_endpoint = config.product.push[env].token

router.get '/', (req, res) ->
  res.json
    'api_domain': api_protocol + api_domain
    'api_version': api_version
  return

router.post '*', (req, res) ->

  requester = null
  url = api_protocol + api_domain + api_id + req.url
  token = api_token_endpoint

  if req.get('Accept').indexOf(spec_version) > -1
    version = req.get('Accept')
  else
    version = api_version

  isMultipart = JSON.stringify(req.headers).indexOf('multipart/form-data')

  if req.url is token
    requester = request.post({
      uri: url
      form: req.body
      headers: Accept: version
      }, (error, response, body) ->
      if error
        console.error 'Refused connection ' + error.code
        res.status(503).send({ error: 'Can\'t connect to Kaizen' }).end
      return)

  else if isMultipart isnt -1
    requester = request.post({
      uri: url
      formData : req.body
      headers: Accept: version
      }, (error, response, body) ->
      if error
        console.error 'Refused connection ' + error.code
        res.status(503).send({ error: 'Can\'t connect to Kaizen' }).end
      return)

  else
    requester = request.post({
      uri: url
      json: req.body
      headers: Accept: version
      }, (error, response, body) ->
      if error
        console.error 'Refused connection ' + error.code
        res.status(503).send({ error: 'Can\'t connect to Kaizen' }).end
      return)

  if env is 'prod'
    res.append 'x-api-endpoint', api_id
    res.append 'x-api-version', version
  else
    res.append 'x-api-endpoint', url
    res.append 'x-api-version', version

  req.pipe(requester).pipe res
  return

router.put '*', (req, res) ->

  requester = null
  url = api_protocol + api_domain + api_id + req.url
  token = api_token_endpoint

  if req.get('Accept').indexOf(spec_version) > -1
    version = req.get('Accept')
  else
    version = api_version

  isMultipart = JSON.stringify(req.headers).indexOf('multipart/form-data')

  if req.url is token
    requester = request.put({
      uri: url
      form: req.body
      headers: Accept: version
      }, (error, response, body) ->
      if error
        console.error 'Refused connection ' + error.code
        res.status(503).send({ error: 'Can\'t connect to Kaizen' }).end
      return)

  else if isMultipart isnt -1
    requester = request.put({
      uri: url
      formData : req.body
      headers: Accept: version
      }, (error, response, body) ->
      if error
        console.error 'Refused connection ' + error.code
        res.status(503).send({ error: 'Can\'t connect to Kaizen' }).end
      return)

  else
    requester = request.put({
      uri: url
      json: req.body
      headers: Accept: version
      }, (error, response, body) ->
      if error
        console.error 'Refused connection ' + error.code
        res.status(503).send({ error: 'Can\'t connect to Kaizen' }).end
      return)

  if env is 'prod'
    res.append 'x-api-endpoint', api_id
    res.append 'x-api-version', version
  else
    res.append 'x-api-endpoint', url
    res.append 'x-api-version', version

  req.pipe(requester).pipe res
  return

router.get '*', (req, res) ->

  requester = null
  url = api_protocol + api_domain + api_id + req.url

  if req.get('Accept').indexOf(spec_version) > -1
    version = req.get('Accept')
  else
    version = api_version

  requester = request.get({
    uri: url
    headers: Accept: version
    }, (error, response, body) ->
    if error
      console.error 'Refused connection ' + error.code
      res.status(503).send({ error: 'Can\'t connect to Kaizen' }).end
    return)

  if env is 'prod'
    res.append 'x-api-endpoint', api_id
    res.append 'x-api-version', version
  else
    res.append 'x-api-endpoint', url
    res.append 'x-api-version', version

  req.pipe(requester).pipe res
  return

router.delete '*', (req, res) ->

  requester = null
  url = api_protocol + api_domain + api_id + req.url
  token = api_token_endpoint

  if req.get('Accept').indexOf(spec_version) > -1
    version = req.get('Accept')
  else
    version = api_version

  isMultipart = JSON.stringify(req.headers).indexOf('multipart/form-data')

  requester = request.delete({
    uri: url
    json: req.body
    headers: Accept: version
    }, (error, response, body) ->
    if error
      console.error 'Refused connection ' + error.code
      res.status(503).send({ error: 'Can\'t connect to Kaizen' }).end
    return)

  if env is 'prod'
    res.append 'x-api-endpoint', api_id
    res.append 'x-api-version', version
  else
    res.append 'x-api-endpoint', url
    res.append 'x-api-version', version

  req.pipe(requester).pipe res
  return

router.patch '*', (req, res) ->

  requester = null
  url = api_protocol + api_domain + api_id + req.url
  token = api_token_endpoint

  if req.get('Accept').indexOf(spec_version) > -1
    version = req.get('Accept')
  else
    version = api_version

  isMultipart = JSON.stringify(req.headers).indexOf('multipart/form-data')

  requester = request.patch({
    uri: url
    json: req.body
    headers: Accept: version
    }, (error, response, body) ->
    if error
      console.error 'Refused connection ' + error.code
      res.status(503).send({ error: 'Can\'t connect to Kaizen' }).end
    return)

  if env is 'prod'
    res.append 'x-api-endpoint', api_id
    res.append 'x-api-version', version
  else
    res.append 'x-api-endpoint', url
    res.append 'x-api-version', version

  req.pipe(requester).pipe res
  return

module.exports = router
