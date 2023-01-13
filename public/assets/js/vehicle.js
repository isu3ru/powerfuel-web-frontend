var app = angular.module("vehicleApp", []);

app.controller("vehicleCtrl", function($scope, $http) {

    $scope.getVehicles = function() {
        $http({
            method: 'GET',
            url: apiBaseUrl+ '/Vehicle/All'
          }).then(function successCallback(response) {
                $scope.vehicles = response.data;
           
            }, function errorCallback(response) {
                console.log(response);
            });
    }
    $scope.confirmVehicles = function() {
        var vehicles = $scope.vehicles.filter(f=> f.selected);
        if(vehicles) {
            var mapIds= vehicles.map(m=> m.id);
            var json = {
                vehicleIds: mapIds,
                vehicleStatus: 2
            };
            var req = {
                method: 'POST',
                url: apiBaseUrl+ '/Vehicle/ChangeStatusOfAVehicles',
                headers: {
                  'Content-Type': 'application/json'
                },
                data: json
            }
               
            $http(req).then(function(){
                $scope.getVehicles();
                alert('Vehicle confirmed successfully');

            }, function(){

            });



        }

    }

    $scope.deleteVehicle = function(id) {
        var req = {
            method: 'POST',
            url: apiBaseUrl+ '/Vehicle/Delete?id='+id,
            headers: {
              'Content-Type': 'application/json'
            },
     
        }
           
        $http(req).then(function(){
            $scope.getVehicles();
            alert('Vehicle Deleted successfully');

        }, function(){

        });

    }

    $scope.updatePeriodQTA = function(vehicle) {
        var req = {
            method: 'POST',
            url: apiBaseUrl+ '/Vehicle/UpdateVehiclePeriodQTA',
            data: vehicle,
            headers: {
              'Content-Type': 'application/json'
            },
     
        }
           
        $http(req).then(function(){
            $scope.getVehicles();
            alert('Vehicle Deleted successfully');

        }, function(){

        });

    }
});

