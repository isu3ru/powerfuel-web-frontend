const express = require('express');
const { sendRequest } = require("../services/rest");
const router = express.Router();

// GET add districts page.
router.get('/', function (req, res) {
    // show add districts page
    res.render('admin/add-district', { title: 'Add Districts' });
});

// GET districts page
router.get('/districts', function (req, res) {
    res.render('admin/add-district', { title: 'Add Districts' });
});

// GET district edit page
router.get('/districts/edit/:id', function (req, res) {
    // send request to get the district by id
    sendRequest('/District/ById', 'GET', {id:req.params.id}, function (data) {
        // on success
        // show the edit page displaying the district data
      res.render('admin/add-district', {title: 'Add Districts', district: data});
    }, function (error) {
        //show the error details on console
        console.log(error);
        // on error, redirect to the districts route
      res.redirect('/districts');
    });
});

// POST district update
router.post('/districts/:id/update', function (req, res) {
    sendRequest('/District/ById', 'GET', {id:req.params.id}, function (data) {
        res.render('admin/add-district', {title: 'Add Districts', district: data});
    }, function (error) {
        res.redirect('/districts');
    });
});

router.get('/fuel-types', function (req, res) {
    res.render('admin/add-fuel-type', { title: 'Add Fuel Types' });
});
router.get('/fuel-types/edit/:id', function (req, res) {
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

router.post('/fuel-types/update', function (req, res) {
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

router.get('/fuel-stations', function (req, res) {
    res.render('admin/add-station', { title: 'Add Filling Stations' });
});

router.post('/fuel-stations', function (req, res) {
    console.log(req.body);

    let payload = req.body;

    const data = {
        "state": 1,
        "name": payload.name,
        "address": payload.address,
        "districtId": payload.district_id,
        "contactPerson": payload.contact_person,
        "email": payload.email_address,
        "durationPerVerhicle": payload.duration_per_vehicle,
        "couldNotDistribute": false,
        "users": []
    };

    sendRequest('/FuelStation/Save', 'POST', data, function (data) {
        console.log(data);
        res.redirect('/admin/fuel-stations');
    }, function (err) {
        console.log(err);
        res.redirect('/admin/fuel-stations');
    });
});

router.get('/fuel-stations/edit/:id', function (req, res) {
    let id = req.params.id;

    // get fuel station by id
    sendRequest('/FuelStation/ById?id=' + id, 'GET', {}, function (data) {
        console.log(data);
        res.render('admin/edit-station', { title: 'Edit Filling Station Details', id: id, station: data });
    }, function (error) {
        console.log('couldnt get fuel station');
        console.log(error);
        res.render('admin/add-station', { title: 'Add Filling Stations' });
    });
});

router.post('/fuel-stations/edit/:id', function (req, res) {
    console.log(req.body);

    let payload = req.body;

    const data = {
        "id": req.params.id,
        "state": 1,
        "name": payload.name,
        "address": payload.address,
        "districtId": payload.district_id,
        "contactPerson": payload.contact_person,
        "email": payload.email_address,
        "durationPerVerhicle": payload.duration_per_vehicle,
        "couldNotDistribute": payload.couldNotDistribute === 1 ? true : false,
        "users": []
    };

    sendRequest('/FuelStation/Save', 'POST', data, function (data) {
        res.redirect('/admin/fuel-stations');
    }, function (err) {
        res.redirect('/admin/fuel-stations');
    });
});

// delete fuel station by id
router.post('/fuel-stations/delete/:id', function (req, res) {
    let id = req.params.id;

    sendRequest('/FuelStation/Delete?id=' + id, 'POST', {}, function (data) {
        res.redirect('/admin/fuel-stations');
    }, function (err) {
        res.redirect('/admin/fuel-stations');
    });
});


// vehicle types
router.get('/vehicle-types', function (req, res) {
    res.render('admin/add-vehicle-type', { title: 'Add Vehicle Types' });
});

// create vehicle type
router.post('/vehicle-types', function (req, res) {
    console.log('create vehicle type');
    let payload = req.body;

    const data = {
        "name": payload.vehicle_type,
        "periodAllocatedQTA": payload.period_quota,
        "period": 2,
        "noOfPeriods": payload.period_days
    };

    sendRequest('/VehicleTypes/Save', 'POST', data, function (data) {
        res.redirect('/admin/vehicle-types');
    }, function (err) {
        res.redirect('/admin/vehicle-types');
    });
});

// show edit page of a vehicle type
router.get('/vehicle-types/edit/:id', function (req, res) {
    console.log('show vehicle type page');
    let id = req.params.id;
    // get vehicle type by id
    sendRequest('/VehicleTypes/ById?id=' + id, 'GET', {}, function (data) {
        res.render('admin/edit-vehicle-type', { title: 'Edit Vehicle Type Details', id: id, vehicleType: data });
    }, function (error) {
        res.render('admin/add-vehicle-type', { title: 'Add Vehicle Types' });
    });
});

// update a vehicle type
router.post('/vehicle-types/edit/:id', function (req, res) {
    console.log('updating vehicle type');
    let id = req.params.id;
    let payload = req.data;
    const data = {
        "id": id,
        "name": payload.vehicle_type,
        "periodAllocatedQTA": payload.period_quota,
        "period": 2,
        "noOfPeriods": payload.period_days
    };

    sendRequest('/VehicleTypes/Save', 'POST', data, function (data) {
        res.redirect('/admin/vehicle-types');
    }, function (err) {
        res.redirect('/admin/vehicle-types');
    });
});

// delete vehicle type
router.post('/vehicle-types/delete/:id', function (req, res) {
    console.log('delete vehicle type');
    let id = req.params.id;
    sendRequest('/VehicleTypes/Delete?id=' + id, 'POST', {}, function (data) {
        res.redirect('/admin/vehicle-types');
    }, function (err) {
        res.redirect('/admin/vehicle-types');
    });
});

module.exports = router;
