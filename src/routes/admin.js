const express = require('express');
const {sendRequest} = require("../services/rest");
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('admin/add-district', {title: 'Add Districts'});
});
router.get('/districts', function (req, res, next) {
    res.render('admin/add-district', {title: 'Add Districts'});
});
// router.get('/districts/edit/:id', function (req, res, next) {
//     sendRequest('/District/ById', 'GET', {id:req.params.id}, function (data) {
//         console.log('got district');
//         console.log(data);
//       res.render('admin/add-district', {title: 'Add Districts', district: data});
//     }, function (error) {
//         console.log('couldnt get district');
//         console.log(error);
//       res.redirect('/districts');
//     });
// });
//
// router.post('/districts/:id/update', function (res, res, next) {
//     sendRequest('/District/ById', 'GET', {id:req.params.id}, function (data) {
//         console.log('got district');
//         console.log(data);
//         res.render('admin/add-district', {title: 'Add Districts', district: data});
//     }, function (error) {
//         console.log('couldnt get district');
//         console.log(error);
//         res.redirect('/districts');
//     });
// });

router.get('/fuel-types', function (req, res, next) {
    res.render('admin/add-fuel-type', {title: 'Add Fuel Types'});
});
router.get('/fuel-stations', function (req, res, next) {
    res.render('admin/add-station', {title: 'Add Filling Stations'});
});
router.get('/vehicle-types', function (req, res, next) {
    res.render('admin/add-vehicle-type', {title: 'Add Vehicle Types'});
});

module.exports = router;
