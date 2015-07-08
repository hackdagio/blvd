config = require('../../../config.json')

exports.index = (req, res) ->
  res.render 'index', config: config
  return

exports.partials = (req, res) ->
  # need to call slice() to strip out the first forward slashs
  res.render req.path.slice(1)
  return

exports.favicon = (req, res) ->
  res.redirect 301, config.product.assets.protocol + config.product.assets.domain + '/' + config.product.id + config.product.assets.path + config.product.assets.files.favicon
  return

exports.avenue = (req, res) ->
  res.render 'avenue', config: config
  return
