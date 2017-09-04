/*jshint esversion: 6 */
/* -------------------------------REQUIRED---------------------------------- */
var express = require('express');
var router = express.Router();
var path = require('path');
const config = require("../config.js");
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

router.post('/', function(req, res) {
  if (req.body.secret === config.secret){
    var desc = req.body.description.split("\r\n");
    var descrip = [];
    for (var i = 0; i < desc.length; i++) {
      descrip.push({desc : desc[i]});
    }

    var obj = {
      title: req.body.title,
      img: req.body.img,
      video: req.body.video,
      overview: {
        summary: req.body.summary,
        languages: req.body.languages,
        frameworks: req.body.frameworks,
        github: req.body.github
      },
      description: descrip
    };

    md.InsertNewProject(obj, 'uni-work').then((results) =>{
      res.status(200).send('Added successfully!');
    }).catch((err) => {
      res.status(500).send('Something broke! - can not get query');
    });

  }
    res.status(500).send('Something broke! - can not insert');
});

module.exports = router;
