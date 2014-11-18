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
            .state('all things', {
                url: '/things',
                templateUrl: 'things/views/things/list.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('create thing', {
                url: '/things/create',
                templateUrl: 'things/views/things/create.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('edit thing', {
                url: '/things/:thingId/edit',
                templateUrl: 'things/views/things/edit.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('thing by id', {
                url: '/things/:thingId',
                templateUrl: 'things/views/things/view.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            });
    }
]);
