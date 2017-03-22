express = require 'express'
router = express.Router()
request = require 'request'

config = require '../../../config.json'

switch process.env.ENV
  when 'dev'
    env = 'dev'
    push_protocol = config.product.push.dev.protocol
    push_domain = config.product.push.dev.domain
    push_id = config.product.push.dev.id
  when 'edge'
    env = 'edge'
    push_protocol = config.product.push.edge.protocol
    push_domain = config.product.push.edge.domain
    push_id = config.product.push.edge.id
  else
    env = 'prod'
    push_protocol = config.product.push.production.protocol
    push_domain = config.product.push.production.domain
    push_id = config.product.push.production.id


router.get '/', (req, res) ->
  res.json
    'api_domain': push_domain
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
