/*jshint esversion: 6 */
"use strict";
var mongo = require('mongodb');
const config = require("../config.js");

module.exports = class MongoDbConnector {
  constructor(){
    this.uri = config.connectionStrings.dev;
  }

  AllUniWorkRecords(coll){
    return new Promise((resolve, reject) => {
      mongo.MongoClient.connect(this.uri, function(err, db) {
        if (err) {
          reject(false);
        }

        db.collection(coll).find({}).toArray(function (err, query){
          if (err) {
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
          reject(false);
        }
        var query = {_id :  new mongo.ObjectId(id)};

        db.collection(coll).findOne(query, function (err, result){
          if (err) {
            db.close();
            reject(false);
          }
          db.close();
          var res = {
            item: result,
            desc: result.description
          }
          resolve(res);
        });
      });
    });
  }
};


/*db.collection(coll).deleteOne(function(err, obj) {
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
    github: "https://github.com/marty-shields/dissertation-db-admin"
  },
  description: [
    {desc: "This is my project which I undertook as part of my " +
    "dissertation at university. The requirements were delivered to me by a " +
    "lecturer who wanted a system for their students to use in order to allow " +
    "them to backup databases made during tutorials and assignments. In addition " +
    "to this, the system was required to allow students to also track the changes " +
    "made to their databases over time so this could be shown to lecturers."},
    {desc: "I developed 2 seperate systems for this containing a back end system developed " +
    "developed in Node JS which use a SQLite database in order to save the " +
    "information. A seperate front end system was created which used HTML, CSS, " +
    "JS and JQuery in order to communicate with the back end system to gather the " +
    "information needed."},
    {desc: "As part of my dissertation I done some research in " +
    "web application security and therfore put in verification on any forms users " +
    "would be putting information into as well as hashing and salting the user's " +
    "password. The front end user interface was put together using the Bootstrap " +
    "framework and the Chart JS API was used in order to get the pie charts required."}
  ]
};

db.collection(coll).insertOne(myobj, function(err, res) {
  if (err) throw err;
  console.log("1 document inserted");
});*/
