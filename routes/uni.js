// /*jshint esversion: 6 */
// /* -------------------------------REQUIRED---------------------------------- */
// var express = require('express');
// var router = express.Router();
// var path = require('path');
// var appRootDir = require('app-root-dir').get();
// var MongoDbConnector = require(path.join(appRootDir, '/da/MongoDbConnector'));
// var md = new MongoDbConnector();
//
// /* -----------------------------MONGO DB URI-------------------------------- */
// var uri = "mongodb://marty-shields:1loD8ziYiusb8A1r@cluster0-shard-00-00-" +
// "uuh61.mongodb.net:27017,cluster0-shard-00-01-" +
// "uuh61.mongodb.net:27017,cluster0-shard-00-02-" +
// "uuh61.mongodb.net:27017/portfolio?ssl=true&replicaSet=Cluster0-" +
// "shard-0&authSource=admin";
//
//
// /* --------------------------------ROUTES----------------------------------- */
// router.get('/', function(req, res) {
//   md.AllUniWorkRecords('uni-work').then((results) =>{
//     var result = {projects : results};
//     res.render(path.join('uni'), {
//       title: 'MS Portfolio - Uni',
//       item: result
//     });
//   }).catch((err) => {
//     res.status(500).send('Something broke! - can not connect to DB');
//   });
// });
//
// router.get('/:id', function(req, res) {
//   md.GetResultByID(req.params.id, 'uni-work').then((results) =>{
//     console.log(results);
//     var result = {projects : results};
//     res.render(path.join('uni/show'), {
//       title: results.title,
//       item: result
//     });
//   }).catch((err) => {
//     res.status(500).send('Something broke! - can not get query');
//   });
// });
//
// module.exports = router;
