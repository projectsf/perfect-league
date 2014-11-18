'use strict';

angular.module('mean').controller('LocationsController', ['$scope','$stateParams', 'Global', 'Locations',
    function($scope, $stateParams, Global, Locations) {
        $scope.global = Global;
        $scope.map = {
          center: {
            latitude: 37.7616535,
            longitude: -122.4491129 
          },
          zoom : 15
        };

        $scope.find = function() {
            Locations.query(function(locations) {
                $scope.locations= locations;
            });
        };

        $scope.findOne = function() {
            Locations.get({
                locationId: $stateParams.locationId
            }, function(event) {
                $scope.location= location;
            });
        };
    }
]);
