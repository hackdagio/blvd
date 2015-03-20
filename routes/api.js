var express = require('express');
var router = express.Router();

var config = require('../../config.json');

router.get('/api', function(req, res) {
  res.json({
    name: config.api.name,
    url: config.api.url
  });
});

module.exports = router;