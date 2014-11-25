'use strict';

angular.module('mean').controller('MatchesController', ['$scope', '$stateParams', '$location', 'Global', 'Matches',
    function($scope, $stateParams, $location, Global, Matches) {
        $scope.global = Global;

        $scope.create = function() {
            var match = new Matches({
                title: this.title,
                content: this.content
            });
            match.$save(function(response) {
                $location.path('matches/' + response._id);
            });

            this.title = '';
            this.content = '';
        };

        $scope.remove = function(match) {
            if (match) {
                match.$remove();

                for (var i in $scope.matches) {
                    if ($scope.matches[i] === match) {
                        $scope.matches.splice(i, 1);
                    }
                }
            } else {
                $scope.match.$remove();
                $location.path('matches');
            }
        };

        $scope.update = function() {
            var match = $scope.match;
            if (!match.updated) {
                match.updated = [];
            }
            match.updated.push('blah blah blah value');

            match.$update(function() {
                $location.path('matches/' + match._id + '/post-result');
            });
        };

        $scope.find = function() {
            Matches.query(function(matches) {
                $scope.matches= matches;
            });
        };

        $scope.findOne = function() {
            Matches.get({
                matchId: $stateParams.matchId
            }, function(match) {
                $scope.match = match;
            });
        };
    }
]);
