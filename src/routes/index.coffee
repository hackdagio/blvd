config = require('../../../config.json')

exports.index = (req, res) ->
  res.render 'index', config: config
  return

exports.partials = (req, res) ->
  res.render req.path.slice(1) # need to call slice() to strip out the first forward slashs
  return