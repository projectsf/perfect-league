'use strict';

//Players service used for players REST endpoint
angular.module('mean').factory('Players', ['$resource',
	function($resource) {
		return $resource('players/:playerId', {
			playerId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
