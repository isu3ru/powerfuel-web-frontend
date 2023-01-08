const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('customer/vehicle-quota-request', { title: 'Vehicle Quota Request' });
});
router.get('/vehicle-quota-request', function(req, res, next) {
  res.render('customer/vehicle-quota-request', { title: 'Vehicle Quota Request' });
});
router.get('/vehicle-view', function(req, res, next) {
  res.render('customer/vehicle-view', { title: 'View Customer Vehicles' });
});
module.exports = router;
