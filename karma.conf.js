module.exports = function(config){
    config.set({
        basePath : 'client',

        files : [
            'components/angular/angular.js',
            'components/angular-cookies/angular-cookies.js',
            'components/angular-mocks/angular-mocks.js',
            'components/angular-ui-router/release/angular-ui-router.js',
            'js/**/*.js',
            'tests/unit/**/*.js'
        ],

        /*exclude : [
            'app/lib/angular/angular-loader.js',
            'app/lib/angular/*.min.js',
            'app/lib/angular/angular-scenario.js'
        ],*/

        autoWatch : true,

        frameworks: ['mocha', 'chai'],

        browsers : ['Chrome'],

        plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-mocha',
            'karma-chai'
        ],

        junitReporter : {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    })
};