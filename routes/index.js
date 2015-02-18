var config = require('./../config.json');

exports.index = function (req, res){
  res.render('index', { 
  	title: config.product.name,
  	generator: config.app.name + ', powered by ' + config.api.name
  });
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};

