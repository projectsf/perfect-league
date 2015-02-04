'use strict';

angular.module('mean').controller('PlayersController', ['$scope', '$stateParams', '$location', 'Global', 'Players','Matches', 
	function($scope, $stateParams, $location, Global, Players, Matches) {
		$scope.global = Global;

	$scope.find = function() {
		Players.query(function(players) {
			$scope.players = players;
			Matches.query(function(matches) {
				$scope.matches = matches;
					
				for (var ii = 0; ii < $scope.players.length; ii += 1) {
					$scope.players[ii].points = 0;

					//walk matches looking for player 
					for (var jj = 0; jj < $scope.matches.length; jj += 1) {
						var playerIndex = -1; 
						if (($scope.matches[jj].players.playerOne.firstName === $scope.players[ii].firstName) && ($scope.matches[jj].players.playerOne.lastName === $scope.players[ii].lastName)) {
							playerIndex = 0;
						}
						else if (($scope.matches[jj].players.playerTwo.firstName === $scope.players[ii].firstName) && ($scope.matches[jj].players.playerTwo.lastName === $scope.players[ii].lastName)) {
							playerIndex = 1;
						}
						if (playerIndex !== -1) {


							// found match that player played in
							var setsWon = 0;
							var setsLost = 0;

							// is player is player one of match
							if (playerIndex === 0) {
								if ($scope.matches[jj].result.playerOne.setOne > $scope.matches[jj].result.playerTwo.setOne) {
									setsWon += 1;
								}
								if ($scope.matches[jj].result.playerOne.setOne < $scope.matches[jj].result.playerTwo.setOne) {
									setsLost += 1;
								}
								if ($scope.matches[jj].result.playerOne.setTwo > $scope.matches[jj].result.playerTwo.setTwo) {
									setsWon += 1;
								}
								if ($scope.matches[jj].result.playerOne.setTwo < $scope.matches[jj].result.playerTwo.setTwo) {
									setsLost += 1;
								}
								if ($scope.matches[jj].result.playerOne.setThree > $scope.matches[jj].result.playerTwo.setThree) {
									setsWon += 1;
								}
								if ($scope.matches[jj].result.playerOne.setThree < $scope.matches[jj].result.playerTwo.setThree) {
									setsLost += 1;
								}
							}
	
							// player is player two of match
							else if (playerIndex === 1) {
								if ($scope.matches[jj].result.playerTwo.setOne > $scope.matches[jj].result.playerOne.setOne) {
									setsWon += 1;
								} 
								if ($scope.matches[jj].result.playerTwo.setOne < $scope.matches[jj].result.playerOne.setOne) {
									setsLost += 1;
								}
								if ($scope.matches[jj].result.playerTwo.setTwo > $scope.matches[jj].result.playerOne.setTwo) {
									setsWon += 1;
								} 
								if ($scope.matches[jj].result.playerTwo.setTwo < $scope.matches[jj].result.playerOne.setTwo) {
									setsLost += 1;
								}
								if ($scope.matches[jj].result.playerTwo.setThree > $scope.matches[jj].result.playerOne.setThree) {
									setsWon += 1;
								} 
								if ($scope.matches[jj].result.playerTwo.setThree < $scope.matches[jj].result.playerOne.setThree) {
									setsLost += 1;
								}
							}


							// calculate points

							// check for unplayed expired match first
							if ((setsWon === 0) && (setsLost === 0)) {
								var now = new Date();
								var expires = new Date($scope.matches[jj].expires);
								if (now > expires) {
									$scope.players[ii].points -= 2;
								}

							} else if ((setsWon === 2) && (setsLost === 0)) {
								$scope.players[ii].points += 3;
							} else if ((setsWon === 2) && (setsLost === 1)) {
								$scope.players[ii].points += 2;
							} else if ((setsWon === 1) && (setsLost === 2)) {
								$scope.players[ii].points += 1;
							}
						}
					}
				}

				//now for rankings
				//sort array of players local scope.  result will be ascending order
				$scope.players.sort(function(a, b) {
					if (a.points > b.points) {
						return 1;
					} else if (a.points < b.points) {
						return -1;
					} else if (a.points === b.points) {
						return 0;
					}
				});


				//initialize using highest point total (index 0 of sorted players)
				var currentRanking = 1;
				var currentPoints = $scope.players[$scope.players.length-1].points;

				for (var kk = $scope.players.length-1; kk >= 0; kk -= 1) {
					if ($scope.players[kk].points < currentPoints) {
						currentRanking +=1;
						currentPoints = $scope.players[kk].points;
					}
					$scope.players[kk].ranking = currentRanking;
				}
			});
		});
	};

		$scope.findOne = function() {
			Players.get({ playerId: $stateParams.playerId }, function(player) {
				$scope.player = player;
			});
		};
	}
]);
