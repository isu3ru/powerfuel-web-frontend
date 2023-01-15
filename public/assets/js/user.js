var app = angular.module("userApp", []);


app.controller("userCtrl", ['$scope', '$http', '$filter', function ($scope, $http, $filter) {

    $scope.getUsers = function() {
        $scope.resetUser();
        $http({
            method: 'GET',
            url: apiBaseUrl+ '/User/All'
          }).then(function successCallback(response) {
       
                $scope.users = response.data;
                $scope.getUserTypes();
                $scope.getfuelStations();
           
            }, function errorCallback(response) {
                console.log(response);
            });
    }

    $scope.getUserTypes = function() {
        $http({
            method: 'GET',
            url: apiBaseUrl+ '/UserTypes/All'
          }).then(function successCallback(response) {
                console.log(response.data);
                $scope.userTypes = response.data;
           
            }, function errorCallback(response) {
                console.log(response);
            });
    }

    $scope.getfuelStations = function() {
        $http({
            method: 'GET',
            url: apiBaseUrl+ '/FuelStation/All'
          }).then(function successCallback(response) {
                console.log(response.data);
                $scope.stations = response.data;
           
            }, function errorCallback(response) {
                console.log(response);
            });
    }


    $scope.saveUsers = function() {
        $scope.user.userTypeId = parseInt($scope.userType);
        $scope.user.fuelStationId = parseInt($scope.station);
        $scope.user.password = $scope.password
        var req = {
            method: 'POST',
            url: apiBaseUrl+ '/User/Save',
            headers: {
              'Content-Type': 'application/json'
            },
            data: $scope.user
        }
           
        $http(req).then(function(){
            $scope.getUsers();
            alert('User Saved successfully');

        }, function(){

        });


    }

    $scope.loadEntries = function(r) {
        $scope.user= r;
        $scope.userType= $scope.user.userTypeId.toString();
        $scope.station= $scope.user.fuelStationId.toString();
    }

    $scope.resetUser = function() {
        $scope.user = {
            id: 0,
            firstName: '',
            lastName: '',
            email: '',
            contactNo: '',
            userTypeId:1,
            fuelStationId: 1
        };
        $scope.userType= $scope.user.userTypeId.toString();
        $scope.station= $scope.user.fuelStationId.toString();
    }

   
}]);

