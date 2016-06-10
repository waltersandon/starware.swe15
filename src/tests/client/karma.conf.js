module.exports = function(config){
    config.set({

        basePath : '../../',

        client: {
            captureConsole: true
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
            'https://code.jquery.com/ui/1.11.4/jquery-ui.js',
            'https://cdn.jsdelivr.net/editor/0.1.0/editor.js',
            'https://cdn.jsdelivr.net/editor/0.1.0/marked.js',
            'https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js',
            'https://jtblin.github.io/angular-chart.js/bower_components/Chart.js/Chart.js',
            'https://jtblin.github.io/angular-chart.js/dist/angular-chart.js',
            

            'static/js/app/*.js',
            'static/js/controller/**/*.js',
            'static/js/model/**/**.js',
            'static/js/util/*.js',
            'static/js/util/markdown/lib/markdown.min.js',
            'tests/client/unit/service/*.js',
            'tests/client/unit/controller/**/*.js',
            'tests/client/unit/data/*.js',
            'tests/client/unit/util/*.js'
        ],

        autoWatch : true,

        frameworks: ['jasmine'],
        reporters: ['progress', 'coverage'],
        browsers : ['Chrome', /*'Firefox'*/],

        plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-coverage'
        ],

        junitReporter : {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        },
        preprocessors: {
            'statis/html/**/*.html':['html2js'],
            'static/js/app/*.js': ['coverage'],
            'static/js/controller/**/*.js':['coverage'],
            'static/js/model/**/**.js':['coverage'],
            'static/js/util/*.js':['coverage'],
            'tests/client/unit/service/*.js':['coverage'],
            'tests/client/unit/controller/**/*.js':['coverage'],
            'tests/client/unit/util/*.js':['coverage']

        },
        coverageReporter: { type : 'html', dir : 'coverage/' }

    });
};