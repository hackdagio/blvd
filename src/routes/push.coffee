express = require 'express'
router = express.Router()
request = require 'request'

config = require '../../../config.json'

env = process.env.ENV
push_protocol = config.product.push[env].protocol
push_domain = config.product.push[env].domain
push_id = config.product.push[env].id

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
