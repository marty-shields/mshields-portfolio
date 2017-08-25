/*jshint esversion: 6 */
/* -------------------------------REQUIRED---------------------------------- */
var express = require('express');
var router = express.Router();
var path = require('path');
var appRootDir = require('app-root-dir').get();
var MongoDbConnector = require('../data-access/MongoDBConnector.js');
var md = new MongoDbConnector();

/* --------------------------------ROUTES----------------------------------- */
router.get('/', function(req, res) {
  md.AllUniWorkRecords('uni-work').then((results) =>{
    var result = {projects : results};
    res.render(path.join('uni'), {
      title: 'MS Portfolio - Uni',
      item: result
    });
  }).catch((err) => {
    res.status(500).send('Something broke! - can not connect to DB');
  });
});

router.get('/:id', function(req, res) {
  md.GetResultByID(req.params.id, 'uni-work').then((results) =>{
    var result = {projects : results.item};
    res.render(path.join('uni/show'), {
      title: results.title,
      item: result,
      description: results.desc
    });
  }).catch((err) => {
    res.status(500).send('Something broke! - can not get query');
  });
});

module.exports = router;
