module.exports = function(config){
    config.set({

        basePath : '../../',

        client: {
            captureConsole: false
        },

        files : [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',

            'https://code.jquery.com/jquery-1.10.2.min.js',
            'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js',
            'static/js/material.min.js',
            'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.min.js',
            'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-cookies.min.js',
            'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-sanitize.js',
            'static/js/async.min.js',
            'static/js/jquery-ui.min.js',
            'https://cdn.jsdelivr.net/editor/0.1.0/editor.js',
            'https://cdn.jsdelivr.net/editor/0.1.0/marked.js',
            'https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js',
            

            'static/js/app/*.js',
            'static/js/controller/**/*.js',
            'static/js/model/**/**.js',
            'static/js/util/*.js',
            'tests/client/unit/service/*.js',
            'tests/client/unit/controller/**/*.js'

        ],

        autoWatch : true,

        frameworks: ['jasmine'],

        browsers : ['Chrome', /*'Firefox'*/],

        plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
        ],

        junitReporter : {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};