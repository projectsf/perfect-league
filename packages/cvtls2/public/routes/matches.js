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
            .state('all matches', {
                url: '/matches',
                templateUrl: 'cvtls2/views/matches/list.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('match by id', {
                url: '/matches/:matchId',
                templateUrl: 'cvtls2/views/matches/view.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            });
    }
]);
