/* -------------------------------REQUIRED---------------------------------- */
var express = require('express');
var router = express.Router();
var path = require('path');
var mongo = require('mongodb')
var MongoClient = require('mongodb').MongoClient;


/* -----------------------------MONGO DB URI-------------------------------- */
var uri = "mongodb://marty-shields:1loD8ziYiusb8A1r@cluster0-shard-00-00-" +
"uuh61.mongodb.net:27017,cluster0-shard-00-01-" +
"uuh61.mongodb.net:27017,cluster0-shard-00-02-" +
"uuh61.mongodb.net:27017/portfolio?ssl=true&replicaSet=Cluster0-" +
"shard-0&authSource=admin";


/* --------------------------------ROUTES----------------------------------- */
router.get('/', function(req, res) {
  MongoClient.connect(uri, function(err, db) {
    if (err) {
      res.status(500).send('Something broke! - can not connect to DB');
    }

    db.collection('uni-work').find({}).toArray(function (err, query){
      if (err)       res.status(500).send('Something broke! - can not get query');
      db.close();

      var results = {projects : query};
      res.render(path.join('uni'), {
        title: 'MS Portfolio - Uni',
        item: results
      });
    });
  });

});

router.get('/:id', function(req, res) {
  MongoClient.connect(uri, function(err, db) {
    if (err) res.status(500).send('Something broke! - can not connect to DB');

    var query = {_id :  new mongo.ObjectId(req.params.id)};

    db.collection('uni-work').findOne(query, function (err, result){
      if (err) res.status(500).send('Something broke! - can not get query');
      db.close();

      var results = {projects : result};
      console.log(results);
      
      res.render(path.join('uni/show'), {item: results});
    });
  });
});

//db.collection("uni-work").deleteMany(function(err, obj) {
//  if (err) throw err;
//  console.log(obj.result.n + " document(s) deleted");
//  db.close();
//});

//db.collection('uni-work').insertOne({
//  title : "Database Administration Tool - Dissertation",
//  img : "https://img.youtube.com/vi/FYvno44PK-Y/mqdefault.jpg",
//  overview : {
//    summary : "Database Administration and Backup Tool",
//    languages : "HTML, CSS, JS, JQuery, Node.JS",
//    frameworks : "Bootstrap, Chart.JS",
//    github : "Insert Link Here"
//  }
// });


module.exports = router;
