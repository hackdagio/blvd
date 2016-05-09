express = require 'express'
router = express.Router()
request = require 'request'
dns = require 'dns'
dnscache = require('dnscache')(
  'enable': true
  'ttl': 180
  'cachesize': 1000)

config = require '../../../config.json'

env = if process.env.ENV is 'prod' then 'prod' else 'dev'

push_protocol = if env is 'dev' then config.product.push.dev.protocol else config.product.push.production.protocol
push_domain = if env is 'dev' then config.product.push.dev.domain else config.product.push.production.domain
push_id = if env is 'dev' then config.product.push.dev.id else config.product.push.production.id

router.get '/', (req, res) ->
  res.json
    'api_domain': push_domain
  return

router.get '*', (req, res) ->

  requester = null

  dnscache.lookup push_domain, (e, hostname) ->
    opts =
      uri: push_protocol + hostname + '/' + push_id + req.url
      headers:
        Host: push_domain

    if env is 'dev'
      res.append 'x-push-ip', hostname

    x = request(opts)
    req.pipe x
    x.pipe res

    return

  return

module.exports = router
