'use strict';

//Things service used for things REST endpoint
angular.module('mean').factory('Things', ['$resource',
	function($resource) {
		return $resource('things/:thingId', {
			thingId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
