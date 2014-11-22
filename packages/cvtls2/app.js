'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var CvtlS2 = new Module('cvtls2');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
CvtlS2.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    CvtlS2.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    CvtlS2.menus.add({
        'roles': ['authenticated'],
        'title': 'Schedule',
        'link': 'all matches'
    });

    CvtlS2.menus.add({
        'roles': ['authenticated'],
        'title': 'Rankings',
        'link': 'all players'
    });

    CvtlS2.menus.add({
        'roles': ['authenticated'],
        'title': 'Messages',
        'link': 'all messages'
    });


    /*
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    CvtlS2.settings({'someSetting':'some value'},function (err, settings) {
      //you now have the settings object
    });


    // Another save settings example this time with no callback
    // This writes over the last settings.
    CvtlS2.settings({'anotherSettings':'some value'});

    // Get settings. Retrieves latest saved settigns
    CvtlS2.settings(function (err, settings) {
      //you now have the settings object
    });
    */
    //CvtlS2.angularDependencies(['google-maps']);
    CvtlS2.aggregateAsset('css', 'cvtls2.css');


    return CvtlS2;
});
