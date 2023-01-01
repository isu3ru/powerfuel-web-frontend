var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/add-district', { title: 'Add Districts'});
});
router.get('/districts', function(req, res, next) {
  res.render('admin/add-district', { title: 'Add Districts'});
});
router.get('/fuel-types', function(req, res, next) {
  res.render('admin/add-fuel-type', { title: 'Add Fuel Types'});
});
router.get('/fuel-stations', function(req, res, next) {
  res.render('admin/add-station', { title: 'Add Filling Stations'});
});
router.get('/vehicle-types', function(req, res, next) {
  res.render('admin/add-vehicle-type', { title: 'Add Vehicle Types'});
});
module.exports = router;
