var config = require('../app/config.json');

exports.index = function (req, res){
  res.render('index', { 
  	title: config.product.name,
  	generator: config.app.name + ', powered by ' + config.api.name
  });
};

exports.partials = function (req, res) {
  res.render(req.path.slice(1)); // need to call slice() to strip out the first forward slashs
};