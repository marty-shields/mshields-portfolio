var express = require('express');
var router = express.Router();

/* --------------------------------ROUTES----------------------------------- */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MS Portfolio - Index' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'MS Portfolio - Contact' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'MS Portfolio - About' });
});

module.exports = router;
