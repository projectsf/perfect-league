'use strict';

angular.module('mean').controller('MatchesController', ['$scope', '$stateParams', '$location', 'Global', 'Matches',
    function($scope, $stateParams, $location, Global, Matches) {
        $scope.global = Global;
        $scope.matchScoreUpdated = false;

        $scope.update = function() {
            var match = $scope.match;
            if (!match.updated) {
                match.updated = [];
            }

            match.$update(function() {
                $location.path('matches/' + match._id + '/post-result');
            });

            $scope.matchScoreUpdated = true;
        };

        $scope.find = function() {
            Matches.query(function(matches) {
                $scope.matches = matches;
		$scope.roundOneMatches = [];
		$scope.roundTwoMatches = [];
		$scope.roundThreeMatches = [];
		$scope.roundFourMatches = [];
		for (var ii = 0 ; ii < matches.length; ii=ii+1) {
			if (matches[ii].roundNumber === 1) {
				$scope.roundOneMatches.push(matches[ii]);
			}
			else if (matches[ii].roundNumber === 2) {
				$scope.roundTwoMatches.push(matches[ii]);
			}
			else if (matches[ii].roundNumber === 3) {
				$scope.roundThreeMatches.push(matches[ii]);
			}
			else if (matches[ii].roundNumber === 4) {
				$scope.roundFourMatches.push(matches[ii]);
			}
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
