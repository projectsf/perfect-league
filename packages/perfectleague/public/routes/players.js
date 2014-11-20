'use strict';

//Setting up route
angular.module('mean').config(['$stateProvider',
    function($stateProvider) {
        // Check if the user is connected
        var checkLoggedin = function($q, $timeout, $http, $location) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function(user) {
                // Authenticated
                if (user !== '0') $timeout(deferred.resolve);

                // Not Authenticated
                else {
                    $timeout(deferred.reject);
                    $location.url('/login');
                }
            });

            return deferred.promise;
        };

        // states for my app
        $stateProvider
            .state('all players', {
                url: '/players',
                templateUrl: 'players/views/list.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('player by id', {
                url: '/players/:playerId',
                templateUrl: 'players/views/players/view.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            });
    }
]);
