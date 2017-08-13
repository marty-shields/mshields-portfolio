/* -------------------------------REQUIRED---------------------------------- */
var express = require('express');
var router = express.Router();
var path = require('path');
var MongoClient = require('mongodb').MongoClient;


/* -----------------------------MONGO DB URI-------------------------------- */
var uri = "mongodb://marty-shields:1loD8ziYiusb8A1r@cluster0-shard-00-00-" +
"uuh61.mongodb.net:27017,cluster0-shard-00-01-" +
"uuh61.mongodb.net:27017,cluster0-shard-00-02-" +
"uuh61.mongodb.net:27017/portfolio?ssl=true&replicaSet=Cluster0-" +
"shard-0&authSource=admin";


/* --------------------------------ROUTES----------------------------------- */
router.get('/', function(req, res, next) {
  MongoClient.connect(uri, function(err, db) {
    if (err) {
      res.status(500).send('Something broke!');
    }

    console.log("Database created!");
    console.log(db);

    db.collection('uni-work').insertOne({
      title : "Database Administration Tool - Dissertation",
      img : "https://img.youtube.com/vi/FYvno44PK-Y/mqdefault.jpg",
      overview : {
        summary : "Database Administration and Backup Tool",
        languages : "HTML, CSS, JS, JQuery, Node.JS",
        frameworks : "Bootstrap, Chart.JS",
        github : "Insert Link Here"
      }
    })
    .then(function (result) {
      console.log(result);
      db.close();

      res.render(path.join('uni'), { title: 'MS Portfolio - Uni' });
    });
  });

});

module.exports = router;
