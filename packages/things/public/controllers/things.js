'use strict';

angular.module('mean').controller('ThingsController', ['$scope', '$stateParams', '$location', 'Global', 'Things',
    function($scope, $stateParams, $location, Global, Things) {
        $scope.global = Global;

        $scope.create = function() {
            var thing = new Things({
                title: this.title,
                content: this.content
            });
            thing.$save(function(response) {
                $location.path('things/' + response._id);
            });

            this.title = '';
            this.content = '';
        };

        $scope.remove = function(thing) {
            if (thing) {
                thing.$remove();

                for (var i in $scope.things) {
                    if ($scope.things[i] === thing) {
                        $scope.things.splice(i, 1);
                    }
                }
            } else {
                $scope.thing.$remove();
                $location.path('things');
            }
        };

        $scope.update = function() {
            var thing = $scope.thing;
            if (!thing.updated) {
                thing.updated = [];
            }
            thing.updated.push(new Date().getTime());

            thing.$update(function() {
                $location.path('things/' + thing._id);
            });
        };

        $scope.find = function() {
            Things.query(function(things) {
                $scope.things= things;
            });
        };

        $scope.findOne = function() {
            Things.get({
                thingId: $stateParams.thingId
            }, function(thing) {
                $scope.thing = thing;
            });
        };
    }
]);
