'use strict';

angular.module('mean').controller('EventsController', ['$scope', '$stateParams', '$location', 'Global', 'Events',
    function($scope, $stateParams, $location, Global, Events) {
        $scope.global = Global;

        $scope.create = function() {
            var event = new Events({
                thing: this.thing,
                loc: this.loc,
                name: this.name
            });
            event.$save(function(response) {
                $location.path('events/' + response._id);
            });

            this.thing = '';
            this.loc = '';
            this.name = '';
        };

        $scope.remove = function(event) {
            if (event) {
                event.$remove();

                for (var i in $scope.events) {
                    if ($scope.events[i] === event) {
                        $scope.events.splice(i, 1);
                    }
                }
            } else {
                $scope.event.$remove();
                $location.path('events');
            }
        };

        $scope.update = function() {
            var event = $scope.event;
            if (!event.updated) {
                event.updated = [];
            }
            event.updated.push(new Date().getTime());

            event.$update(function() {
                $location.path('events/' + event._id);
            });
        };

        $scope.find = function() {
            Events.query(function(events) {
                $scope.events= events;
            });
        };

        $scope.findOne = function() {
            Events.get({
                eventId: $stateParams.eventId
            }, function(event) {
                $scope.event = event;
            });
        };
    }
]);
