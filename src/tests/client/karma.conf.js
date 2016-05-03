module.exports = function(config){
    config.set({

        basePath : '../../',

        files : [
            'https://code.jquery.com/jquery-1.10.2.min.js',
            'static/js/jquery-ui.min.js',
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'static/js/app/*.js',
            'static/js/controller/*.js',
            'static/js/model/*.js',
            'tests/client/unit/**/*.js'

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