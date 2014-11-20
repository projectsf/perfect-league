'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var PerfectLeague = new Module('perfectleague');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
PerfectLeague.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    PerfectLeague.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    PerfectLeague.menus.add({
        'roles': ['authenticated'],
        'title': 'Players',
        'link': 'all players'
    });

    PerfectLeague.menus.add({
        'roles': ['authenticated'],
        'title': 'Schedule',
        'link': 'all players'
    });

    PerfectLeague.menus.add({
        'roles': ['authenticated'],
        'title': 'Results',
        'link': 'all players'
    });

    PerfectLeague.menus.add({
        'roles': ['authenticated'],
        'title': 'Messages',
        'link': 'all players'
    });


    /*
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    PerfectLeague.settings({'someSetting':'some value'},function (err, settings) {
      //you now have the settings object
    });


    // Another save settings example this time with no callback
    // This writes over the last settings.
    PerfectLeague.settings({'anotherSettings':'some value'});

    // Get settings. Retrieves latest saved settigns
    PerfectLeague.settings(function (err, settings) {
      //you now have the settings object
    });
    */
    //PerfectLeague.angularDependencies(['google-maps']);
    PerfectLeague.aggregateAsset('css', 'perfect-league.css');


    return PerfectLeague;
});
