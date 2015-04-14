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
									$scope.players[ii].points -= 0;
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
			
				Players.query(function(players) {
					$scope.players = players;
					Matches.query(function(matches) {
						$scope.matches = matches;
					
						for (var ii = 0; ii < $scope.players.length; ii += 1) {
							$scope.players[ii].points = 0;
							$scope.players[ii].matchesWon = 0;
							$scope.players[ii].matchesLost = 0;
							$scope.players[ii].setsWon = 0;
							$scope.players[ii].setsLost = 0;
							$scope.players[ii].gamesWon = 0;
							$scope.players[ii].gamesLost = 0;
							$scope.players[ii].matchHistory = [];
							var now;
							var expires;

							//walk matches looking for player 
							for (var jj = 0; jj < $scope.matches.length; jj += 1) {
								var matchStatus = 'Unknown';

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
									var thisMatch = {};

									// is player is player one of match
									if (playerIndex === 0) {
									
																	//prettify result for match history
								if ( ($scope.matches[jj].result.playerOne.setOne === 0) && ($scope.matches[jj].result.playerTwo.setOne === 0) ) {
									now = new Date();
									expires = new Date($scope.matches[jj].expires);
									if ( now > expires ) {
										matchStatus = 'Did Not Play';
									} else {
										matchStatus = 'Not Complete';
									}
								}
								else if ( ($scope.matches[jj].result.playerOne.setThree === 0) && ($scope.matches[jj].result.playerTwo.setThree === 0) ) {
									matchStatus = $scope.matches[jj].result.playerOne.setOne.toString() + '-' + $scope.matches[jj].result.playerTwo.setOne.toString() + ' ' + $scope.matches[jj].result.playerOne.setTwo.toString() + '-' + $scope.matches[jj].result.playerTwo.setTwo.toString();
								}
								else {
									matchStatus = $scope.matches[jj].result.playerOne.setOne.toString() + '-' + $scope.matches[jj].result.playerTwo.setOne.toString() + ' ' + $scope.matches[jj].result.playerOne.setTwo.toString() + '-' + $scope.matches[jj].result.playerTwo.setTwo.toString() + ' ' + $scope.matches[jj].result.playerOne.setThree.toString() + '-' + $scope.matches[jj].result.playerTwo.setThree.toString();
								}
									
										if (($scope.matches[jj].result.playerOne.setOne > 0) || ($scope.matches[jj].result.playerTwo.setOne > 0)) {
											$scope.players[ii].gamesWon += $scope.matches[jj].result.playerOne.setOne + $scope.matches[jj].result.playerOne.setTwo + $scope.matches[jj].result.playerOne.setThree;
											$scope.players[ii].gamesLost += $scope.matches[jj].result.playerTwo.setOne + $scope.matches[jj].result.playerTwo.setTwo + $scope.matches[jj].result.playerTwo.setThree;
										}
										
										//push to match history
										thisMatch = {
											roundNumber : $scope.matches[jj].roundNumber,
											opponent: {
												firstName: $scope.matches[jj].players.playerTwo.firstName,
												lastName: $scope.matches[jj].players.playerTwo.lastName
											},
											result: matchStatus
										};
										$scope.players[ii].matchHistory.push(thisMatch);

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
									
																	//prettify result for match history
								if ( ($scope.matches[jj].result.playerOne.setOne === 0) && ($scope.matches[jj].result.playerTwo.setOne === 0) ) {
									now = new Date();
									expires = new Date($scope.matches[jj].expires);
									if ( now > expires ) {
										matchStatus = 'Did Not Play';
									} else {
										matchStatus = 'Not Complete';
									}
								}
								else if ( ($scope.matches[jj].result.playerOne.setThree === 0) && ($scope.matches[jj].result.playerTwo.setThree === 0) ) {
									matchStatus = $scope.matches[jj].result.playerTwo.setOne.toString() + '-' + $scope.matches[jj].result.playerOne.setOne.toString() + ' ' + $scope.matches[jj].result.playerTwo.setTwo.toString() + '-' + $scope.matches[jj].result.playerOne.setTwo.toString();
								}
								else {
									matchStatus = $scope.matches[jj].result.playerOne.setTwo.toString() + '-' + $scope.matches[jj].result.playerTwo.setTwo.toString() + ' ' + $scope.matches[jj].result.playerTwo.setTwo.toString() + '-' + $scope.matches[jj].result.playerOne.setTwo.toString() + ' ' + $scope.matches[jj].result.playerTwo.setThree.toString() + '-' + $scope.matches[jj].result.playerOne.setThree.toString();
								}
									
									
										if (($scope.matches[jj].result.playerOne.setOne > 0) || ($scope.matches[jj].result.playerTwo.setOne > 0)) {
											$scope.players[ii].gamesWon += $scope.matches[jj].result.playerTwo.setOne+ $scope.matches[jj].result.playerTwo.setTwo + $scope.matches[jj].result.playerTwo.setThree;
											$scope.players[ii].gamesLost += $scope.matches[jj].result.playerOne.setOne + $scope.matches[jj].result.playerOne.setTwo + $scope.matches[jj].result.playerOne.setThree;
										}
										
										//push to match history
										thisMatch = {
											roundNumber : $scope.matches[jj].roundNumber,
											opponent: {
												firstName: $scope.matches[jj].players.playerOne.firstName,
												lastName: $scope.matches[jj].players.playerOne.lastName
											},
											result: matchStatus
										};
										$scope.players[ii].matchHistory.push(thisMatch);
										
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
								
									//set sets won and lost to player
									$scope.players[ii].setsWon += setsWon;
									$scope.players[ii].setsLost += setsLost;

									// calculate points

									// check for unplayed expired match first
									if ((setsWon === 0) && (setsLost === 0)) {
										now = new Date();
										expires = new Date($scope.matches[jj].expires);
										if (now > expires) {
											$scope.players[ii].points -= 0;
											$scope.players[ii].gamesForfeited += 1;
										}

									} else if ((setsWon === 2) && (setsLost === 0)) {
										$scope.players[ii].points += 3;
										$scope.players[ii].matchesWon += 1;
									} else if ((setsWon === 2) && (setsLost === 1)) {
										$scope.players[ii].points += 2;
										$scope.players[ii].matchesWon += 1;
									} else if ((setsWon === 1) && (setsLost === 2)) {
										$scope.players[ii].points += 1;
										$scope.players[ii].matchesLost += 1;
									} else if (setsWon === 0) {
										$scope.players[ii].matchesLost += 1;
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
			
						//set attributes only for this player
						for (var mm = 0; mm < $scope.players.length; mm += 1) {
							if (($scope.players[mm].firstName === $scope.player.firstName) && ($scope.players[mm].lastName === $scope.player.lastName)) {		
								$scope.ranking = $scope.players[mm].ranking;
								$scope.points = $scope.players[mm].points;
								$scope.matchesWon = $scope.players[mm].matchesWon;
								$scope.matchesLost = $scope.players[mm].matchesLost;
								$scope.setsWon = $scope.players[mm].setsWon;
								$scope.setsLost = $scope.players[mm].setsLost;
								$scope.gamesWon = $scope.players[mm].gamesWon;
								$scope.gamesLost = $scope.players[mm].gamesLost;
								$scope.matchHistory = $scope.players[mm].matchHistory;

								//sort match history by round number. result will be ascending order
								$scope.matchHistory.sort(function(a, b) {
									if (a.roundNumber > b.roundNumber) {
										return 1;
									} else if (a.roundNumber < b.roundNumber) {
										return -1;
									} else if (a.roundNumber === b.roundNumber) {
										return 0;
									}
								});
							}
						}
					});
				});
			});
		};
	}
]);
