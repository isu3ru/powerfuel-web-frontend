var app = angular.module("vehicleApp", []);

app.controller("vehicleCtrl", ['$scope', '$http', '$filter', function ($scope, $http, $filter) {

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

    $scope.loadFuelStations = function() {
        $scope.fromdate = new Date();
        $scope.todate = new Date();
        $http({
            method: 'GET',
            url: apiBaseUrl+ '/FuelStation/All'
          }).then(function successCallback(response) {
                $scope.stations = response.data;
                if(response.data) {
                    $scope.fuelstationId = response.data[0].id.toString();
                }

                
           
            }, function errorCallback(response) {
                console.log(response);
            });
    }

    $scope.loadquata = function() {
       var fr = $filter('date')(new Date($scope.fromdate), 'yyyy-MM-dd');
       var to = $filter('date')(new Date($scope.todate), 'yyyy-MM-dd');

       $http({
        method: 'GET',
        url: apiBaseUrl+ '/VehicleRequest/GetQuataList?start='+ fr +'&end='+ to +'&fuelStationId='+$scope.fuelstationId
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

    $scope.filteryByStatus = function(val) {
        if(val == -1) {
            $scope.requests = JSON.parse(JSON.stringify($scope.allrequests));
        } else {
            $scope.requests = JSON.parse(JSON.stringify($scope.allrequests.filter(f=> f.requestStatus == val)));
        }
    }
    $scope.cancelAll = function() {
        var cancelRequests = $scope.requests.filter(f=> f.requestStatus == 2 && f.selected);
        if(cancelRequests) {
            var ids = cancelRequests.map(m=> m.id);

            var json = {
                vehicleIds: ids,
                
            };
            var req = {
                method: 'POST',
                url: apiBaseUrl+ '/VehicleRequest/CancelRequests',
                headers: {
                  'Content-Type': 'application/json'
                },
                data: json
            }
               
            $http(req).then(function(){
                $scope.loadquata();
                alert('Request Canceled successfully');

            }, function(){

            });

        }
    }
}]);

