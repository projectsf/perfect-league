'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Things = new Module('Things');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Things.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Things.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Things.menus.add({
        'roles': ['authenticated'],
        'title': 'Things',
        'link': 'all things'
    });
    Things.menus.add({
        'roles': ['authenticated'],
        'title': 'What are they doing',
        'link': 'all events'
    });
    Things.menus.add({
        'roles': ['authenticated'],
        'title': 'Where are they',
        'link': 'all locations'
    });


    /*
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Things.settings({'someSetting':'some value'},function (err, settings) {
      //you now have the settings object
    });


    // Another save settings example this time with no callback
    // This writes over the last settings.
    Things.settings({'anotherSettings':'some value'});

    // Get settings. Retrieves latest saved settigns
    Things.settings(function (err, settings) {
      //you now have the settings object
    });
    */
    Things.angularDependencies(['google-maps']);
    Things.aggregateAsset('css', 'things.css');


    return Things;
});
