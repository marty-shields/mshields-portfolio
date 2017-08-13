var express = require('express');
var router = express.Router();
var path = require('path');

/* --------------------------------ROUTES----------------------------------- */
router.get('/', function(req, res, next) {
  res.render(path.join('uni'), { title: 'MS Portfolio - Uni' });
});

module.exports = router;
