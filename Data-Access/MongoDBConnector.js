/*jshint esversion: 6 */
"use strict";
var mongo = require('mongodb');

module.exports = class MongoDbConnector {
  constructor(){
    this.uri = "mongodb://marty-shields:1loD8ziYiusb8A1r@cluster0-shard-00-00-" +
    "uuh61.mongodb.net:27017,cluster0-shard-00-01-" +
    "uuh61.mongodb.net:27017,cluster0-shard-00-02-" +
    "uuh61.mongodb.net:27017/portfolio?ssl=true&replicaSet=Cluster0-" +
    "shard-0&authSource=admin";
  }

  AllUniWorkRecords(coll){
    return new Promise((resolve, reject) => {
      mongo.MongoClient.connect(this.uri, function(err, db) {
        if (err) {
          console.log(err);
          reject(false);
        }

        db.collection(coll).find({}).toArray(function (err, query){
          if (err) {
            console.log(err);
            db.close();
            reject(false);
          }

          db.close();

          resolve(query);
        });
      });
    });
  }

  GetResultByID(id, coll){
    return new Promise((resolve, reject) => {
      mongo.MongoClient.connect(this.uri, function(err, db) {
        if (err) {
          console.log(err);
          reject(false);
        }

        var query = {_id :  new mongo.ObjectId(id)};

        db.collection(coll).findOne(query, function (err, result){
          if (err) {
            console.log(err);
            db.close();
            reject(false);
          }

          db.close();

          resolve(result);
        });
      });
    });
  }
};

/*
db.collection(coll).deleteOne(function(err, obj) {
  if (err) throw err;
  console.log("1 document deleted");
});

var myobj = {
  title: "Database Administration Tool - Dissertation",
  img: "https://img.youtube.com/vi/FYvno44PK-Y/mqdefault.jpg",
  video: "https://www.youtube.com/embed/FYvno44PK-Y",
  overview: {
    summary: "Database Administration and Backup Tool",
    languages: "HTML, CSS, JS, JQuery, Node.js",
    frameworks: "Bootstrap, ChartJS",
    github: "INSERT LINK HERE"
  }
};

db.collection(coll).insertOne(myobj, function(err, res) {
  if (err) throw err;
  console.log("1 document inserted");
});*/
