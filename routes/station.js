var express = require('express');
var router = express.Router();

/* GET / */
router.get('/', function(req, res, next) {
  res.render('station/current-stock', { title: 'Current Station Stock'});
});
// GET current stock
router.get('/current-stock', function(req, res, next) {
  res.render('station/current-stock', { title: 'Current Stock'});
});
// GET current stock
router.get('/station-order', function(req, res, next) {
  res.render('station/station-order', { title: 'Station Order'});
});
// GET current stock
router.get('/station-stock-log', function(req, res, next) {
  res.render('station/station-stock-log', { title: 'Station Stock Log'});
});

module.exports = router;
