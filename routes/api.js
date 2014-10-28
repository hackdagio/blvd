/**
JSON to Angular
**/

var express = require('express');
var router = express.Router();

router.get('/name', function(req, res) {
  res.json({
    name: 'Concepto'
  });
});

module.exports = router;