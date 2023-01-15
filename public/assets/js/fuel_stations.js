/**
 * Fuel Stations form reset
 */
function resetFuelStationForm() {
    // clear form fields values
    $('#name').val('');
    $('#address').val('');
    $('#district_id').val('');
    $('#contact_person').val('');
    $('#email').val('');
    $('#duration_per_verhicle').val('');
}

/**
 * Save fuel station
 */
function loadDistrictsSelect() {
    // get district select element
    let select = $('#district_id');
    // get the selected data value from the page response
    let selected = select.data('selected');
    // set sekect disabled until the options are populated
    select.prop('disabled', true);
    select.html(`<option>Loading, please wait...</option>`);
    // send ajax request
    $.ajax({
        url: apiBaseUrl + '/District/All', // url
        type: 'GET', // GET method
        success: function (data) {
            // onsucess
            // populate the select with districts
            select.empty();

            // loop through each district entry and add as an option
            $.each(data, function (index, value) {
                select.append(`<option value="${value.id}" ${selected == value.id ? 'selected' : ''}>
                ${value.name}</option>`);
            });
            // re-enable the select element
            select.prop('disabled', false);
        },
        error: function (error) { // if on error
            // empty the select element and re-enable it
            select.empty();
            select.prop('disabled', false);
        }
    });
}

/**
 * Load fuel stations table
 */
function loadFuelStationsTable() {
    // send ajax request
    $.get(apiBaseUrl + '/FuelStation/All', function (data) {
        // on success
        var table = $('#fuel-stations-table tbody'); // get the table body
        // empty the table body
        table.empty();
        // loop through each fuel station entry and add as a row
        $.each(data, function (index, value) {
            table.append(`<tr>
                <td>
                ${value.name == null ? '-' : value.name}
                ${value.couldNotDistribute ? '<span class="badge bg-secondary">Not Distributing</span>' : '<span class="badge bg-success">Distributing</span>'}
                </td>
                <td>${value.address == null ? '-' : value.address}</td>
                <td>${value.district.name == null ? '-' : value.district.name}</td>
                <td>${value.durationPerVerhicle}</td>
                <td>${value.contactPerson == null ? '-' : value.contactPerson}<br />${value.email == null ? '-' : value.email}</td>
                <td>
                    <a href="/admin/fuel-stations/edit/${value.id}" 
                    class="btn btn-primary btn-sm">Edit</a>
                    <form action="/admin/fuel-stations/delete/${value.id}" 
                    method="POST" class="d-inline" 
                    onsubmit="return confirm('Are you sure?')">
                        <button class="btn btn-danger btn-sm">Delete
                    </button></form>
                </td>
            </tr>`);
        });
    });
}

$(function () {
    // call functions on page load
    loadDistrictsSelect();
    loadFuelStationsTable();
});


var app = angular.module("stationApp", []);

app.controller("stationCtrl", ['$scope', '$http', '$filter', function ($scope, $http, $filter) {

    $scope.getStoks = function() {
        $http({
            method: 'GET',
            url: apiBaseUrl+ '/FuelStation/AllFuelStocks'
          }).then(function successCallback(response) {
                console.log(response.data);
                $scope.stocks = response.data;
           
            }, function errorCallback(response) {
                console.log(response);
            });
    }

    $scope.getFuelStations = function() {
        $http({
            method: 'GET',
            url: apiBaseUrl+ '/FuelStation/All'
          }).then(function successCallback(response) {
                console.log(response.data);
                $scope.fuelStations = response.data;
           
            }, function errorCallback(response) {
                console.log(response);
            });
    }

    $scope.getFuelTypes = function() {
        $http({
            method: 'GET',
            url: apiBaseUrl+ '/FuelTypes/All'
          }).then(function successCallback(response) {
                console.log(response.data);
                $scope.fuelTypes = response.data;
           
            }, function errorCallback(response) {
                console.log(response);
            });
    }


    $scope.resetOrder = function() {
            $scope.fuelOrder = {
                 id: 0,
                 orderNumber:'',
                 fuelStationId: 1,
                 fuelTypeId: 1,
                 qty: 0,
                 receivedDateTime: new Date(),
                 requestStatus: 1



                }

                
                $scope.stationId = $scope.fuelOrder.fuelStationId.toString();
                $scope.fuelTypeId = $scope.fuelOrder.fuelTypeId.toString();
                $scope.statusId = $scope.fuelOrder.requestStatus.toString(); 
    }

    $scope.requstPageInitialize = function() {
        $scope.fromdate = new Date();
        $scope.todate = new Date();
        $scope.requestStatus = [
            { id: 1, name: 'Created'},
            { id: 2, name: 'Confirmed'},
            { id: 3, name: 'Delivered'},
            { id: 4, name: 'Canceled'},
        ]
        $scope.resetOrder();
        $scope.getFuelTypes(); 
        $scope.getFuelStations();

    }
    $scope.saveOrder = function() {
        $scope.fuelOrder.fuelStationId = parseInt($scope.stationId);
        $scope.fuelOrder.fuelTypeId = parseInt($scope.fuelTypeId);
        $scope.fuelOrder.requestStatus = parseInt($scope.statusId);
        console.log(JSON.stringify($scope.fuelOrder));
        var req = {
            method: 'POST',
            url: apiBaseUrl+ '/FuelStationRequest/Save',
            headers: {
              'Content-Type': 'application/json'
            },
            data: $scope.fuelOrder
        }
           
        $http(req).then(function(){
            $scope.loadquata();
            alert(' Saved successfully');

        }, function(){

        });
    }

    $scope.loadquata = function() {
        var fr = $filter('date')(new Date($scope.fromdate), 'yyyy-MM-dd');
        var to = $filter('date')(new Date($scope.todate), 'yyyy-MM-dd');
 
        $http({
         method: 'GET',
         url: apiBaseUrl+ '/FuelStation/FuelStationRequests?start='+ fr +'&end='+ to 
       }).then(function successCallback(response) {
             console.log(response.data);
             $scope.allrequests =  response.data;
             if($scope.allrequests) {
                 $scope.requests = JSON.parse(JSON.stringify($scope.allrequests));
             }
        
         }, function errorCallback(response) {
             console.log(response);
         });
 
     }

     $scope.loadEntries = function(r) {
        $scope.fuelOrder = JSON.parse(JSON.stringify(r));
    
        $scope.fuelOrder.receivedDateTime =  new Date($scope.fuelOrder.receivedDateTime);
        $scope.stationId = $scope.fuelOrder.fuelStationId.toString();
        $scope.fuelTypeId = $scope.fuelOrder.fuelTypeId.toString();
        $scope.statusId = $scope.fuelOrder.requestStatus.toString(); 
     }
 

}]);


