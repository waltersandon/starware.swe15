module.exports = function(config){
    config.set({

        basePath : '../../',

        files : [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'static/js/**/*.js',
            'tests/client/unit/**/*.js',
            'static/js/jquery-ui.min.js'
        ],

        autoWatch : true,

        frameworks: ['jasmine'],

        browsers : ['Chrome', 'Firefox'],

        plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-jquery'
        ],

        junitReporter : {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};