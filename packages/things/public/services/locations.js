'use strict';

//Locations service used for locations REST endpoint
angular.module('mean').factory('Locations', ['$resource',
	function($resource) {
		return $resource('locations/:locationId', {
			locationId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
