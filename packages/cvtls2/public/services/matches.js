'use strict';

//Matches service used for matches REST endpoint
angular.module('mean').factory('Matches', ['$resource',
	function($resource) {
		return $resource('matches/:matchId', {
			matchId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
