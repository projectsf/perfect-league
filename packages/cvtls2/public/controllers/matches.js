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
                $location.path('matches');
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
				$scope.roundFiveMatches = [];
				$scope.roundSixMatches = [];
				$scope.roundSevenMatches = [];
				$scope.roundEightMatches = [];
				for (var ii = 0 ; ii < matches.length; ii=ii+1) {
					var match = matches[ii];

					//generate status 
					if ( (match.result.playerOne.setOne === 0) && (match.result.playerTwo.setOne === 0) ) {
						var now = new Date();
						var expires = new Date(match.expires);
						if ( now > expires ) {
							match.status = 'Forfeit';
						} else {
							match.status = 'Not Complete';
						}
					}
					else if ( (match.result.playerOne.setThree === 0) && (match.result.playerTwo.setThree === 0) ) {
						match.status = match.result.playerOne.setOne.toString() + '-' + match.result.playerTwo.setOne.toString() + ' ' + match.result.playerOne.setTwo.toString() + '-' + match.result.playerTwo.setTwo.toString();
					}
					else {
						match.status = match.result.playerOne.setOne.toString() + '-' + match.result.playerTwo.setOne.toString() + ' ' + match.result.playerOne.setTwo.toString() + '-' + match.result.playerTwo.setTwo.toString() + ' ' + match.result.playerOne.setThree.toString() + '-' + match.result.playerTwo.setThree.toString();
					}

					if (match.roundNumber === 1) {
						$scope.roundOneMatches.push(match);
					}
					else if (match.roundNumber === 2) {
						$scope.roundTwoMatches.push(match);
					}
					else if (match.roundNumber === 3) {
						$scope.roundThreeMatches.push(match);
					}
					else if (match.roundNumber === 4) {
						$scope.roundFourMatches.push(match);
					}
					else if (match.roundNumber === 5) {
						$scope.roundFiveMatches.push(match);
					}
					else if (match.roundNumber === 6) {
						$scope.roundSixMatches.push(match);
					}
					else if (match.roundNumber === 7) {
						$scope.roundSevenMatches.push(match);
					}
					else if (match.roundNumber === 8) {
						$scope.roundEightMatches.push(match);
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
