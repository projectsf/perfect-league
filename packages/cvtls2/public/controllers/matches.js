'use strict';

angular.module('mean').controller('MatchesController', ['$scope', '$stateParams', '$location', 'Global', 'Matches',
    function($scope, $stateParams, $location, Global, Matches) {
        $scope.global = Global;

        $scope.update = function() {
            var match = $scope.match;
            if (!match.updated) {
                match.updated = [];
            }

            match.$update(function() {
                $location.path('matches/' + match._id + '/post-result');
            });
        };

        $scope.find = function() {
            Matches.query(function(matches) {
                $scope.matches = matches;
		$scope.roundOneMatches = [];
		for (var ii = 0 ; ii < 7; ++ii) {
			$scope.roundOneMatches.push(matches[ii]);
		}
		$scope.roundTwoMatches = [];
		for (var ii = 0 ; ii < 7; ++ii) {
			$scope.roundTwoMatches.push(matches[ii+7]);
		}
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
