const express = require('express');
const { sendRequest } = require("../services/rest");
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('admin/add-district', { title: 'Add Districts' });
});
router.get('/districts', function (req, res, next) {
    res.render('admin/add-district', { title: 'Add Districts' });
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
// router.post('/districts/:id/update', function (req, res, next) {
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
    res.render('admin/add-fuel-type', { title: 'Add Fuel Types' });
});
router.get('/fuel-types/edit/:id', function (req, res, next) {
    // get id from the request
    let id = req.params.id;
    console.log(`Got id = ${id}`);
    // get the fuel type by id
    sendRequest('/FuelTypes/ById?id=' + id, 'GET', {}, function (data) {
        console.log(data);
        res.render('admin/edit-fuel-type', { title: 'Add Fuel Types', id: id, fuelType: data });
    }, function (error) {
        console.log('couldnt get fuel type');
        console.log(error);
    });
});

router.post('/fuel-types/update', function (req, res, next) {
    // get post data from req
    let id = req.body.fuelTypeId;
    let name = req.body.fuleTypeName;
    let rolOfStation = req.body.reorderLevel;

    let postData = { id: id, name: name, rolOfStation: rolOfStation };

    // update the fuel type
    sendRequest('/FuelTypes/Save', 'POST', postData, function (data) {
        res.redirect('/admin/fuel-types');
    }, function (error) {
        console.log('couldnt update fuel type');
        console.log(error);
        // redirect to all fuel types
        res.redirect('/admin/fuel-types');
    });
});

router.get('/fuel-stations', function (req, res, next) {
    res.render('admin/add-station', { title: 'Add Filling Stations' });
});
router.get('/vehicle-types', function (req, res, next) {
    res.render('admin/add-vehicle-type', { title: 'Add Vehicle Types' });
});

module.exports = router;
