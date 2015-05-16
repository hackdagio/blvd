config = require('../../../config.json')

exports.index = (req, res) ->
  res.render 'index', config: config
  return

exports.partials = (req, res) ->
  # need to call slice() to strip out the first forward slashs
  res.render req.path.slice(1)
  return

exports.favicon = (req, res) ->
  res.redirect 301, config.product.assets.url + config.product.id + '/assets/img/favicon.png'
  return