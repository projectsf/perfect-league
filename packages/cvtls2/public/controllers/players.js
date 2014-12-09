'use strict';

angular.module('mean').controller('PlayersController', ['$scope', '$stateParams', '$location', 'Global', 'Players','Matches', 
	function($scope, $stateParams, $location, Global, Players, Matches) {
		$scope.global = Global;

		$scope.find = function() {
			Players.query(function(players) {
			$scope.players= players;
			for( var ii=0; ii < $scope.players.length; ii=ii+1) {
				$scope.players[ii].points = 0;
				$scope.players[ii].ranking = 2;
				if($scope.players[ii].firstName === 'Doug') {
					$scope.players[ii].points = 3;
					$scope.players[ii].ranking = 1;
				}
				if($scope.players[ii].firstName === 'James') {
					$scope.players[ii].points = 3;
					$scope.players[ii].ranking = 1;
				}
			}
			});
		};

		$scope.findOne = function() {
			Players.get({ playerId: $stateParams.playerId }, function(player) {
				$scope.player = player;
			});
		};
	}
]);
