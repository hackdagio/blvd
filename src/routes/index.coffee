config = require('../../../config.json')

exports.index = (req, res) ->
  res.render 'index',
    title: config.product.name
    generator: config.app.name + ', powered by ' + config.api.name
    api: config.api.url
  return

exports.partials = (req, res) ->
  res.render req.path.slice(1) # need to call slice() to strip out the first forward slashs
  return