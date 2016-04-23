$(function () {
    $.material.init();

    var app = angular.module('quizzipediaApp', ['ngRoute', 'SessionServiceModule']).config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: 'html/student/Home.html',
                controller: 'HomeController'
            }).when('/login', {
                templateUrl: 'html/public/LogIn.html',
                controller: 'LogInController'
            }).otherwise({
                templateUrl: 'html/public/PageNotFound.html',
                controller: 'PageNotFoundController'
            });
        }]);



    app.controller('quizzipediaController', function ($scope) {
        $scope.title = 'quizzipediaController';
    });

    app.controller('HomeController', function ($scope) {
        $scope.title = 'HomeController';
    });


});


/*
 angular.module('service', ['QuestionnaireService', 'QuestionService', 'RoleService', 'SessionService', 'TagService', 'UserService']);
 angular.module('data', ['Questionnaire', 'Question', 'Role', 'Session', 'Tag', 'User']);
 angular.module('util', ['Check', 'CurrentQuestion', 'CurrentQuestionnaire', 'CurrentUser']);
 
 angular.module('Model', ['data', 'service', 'util']);
 
 var app = angular.module('myApp', ['SessionService']);
 
 app.controller('LogIn', ['$location', '$scope', '$rootScope', 'SessionService', function ($location, $scope, $rootScope, SessionService) {
 $scope.submit = function () {
 SessionService.login($scope.password, $scope.userName);
 };
 }]);
 
 */

/*
 
 var scotchApp = angular.module('scotchApp', ['ngRoute']);
 
 // configure our routes
 scotchApp.config(function ($routeProvider) {
 $routeProvider
 
 // route for the home page
 .when('/', {
 templateUrl: 'html/home.html',
 controller: 'mainController'
 })
 
 // route for the about page
 .when('/about', {
 templateUrl: 'html/about.html',
 controller: 'aboutController'
 })
 
 // route for the contact page
 .when('/contact', {
 templateUrl: 'html/contact.html',
 controller: 'contactController'
 });
 });
 
 // create the controller and inject Angular's $scope
 scotchApp.controller('mainController', function ($scope) {
 // create a message to display in our view
 $scope.message = 'Everyone come and see how good I look!';
 });
 
 scotchApp.controller('aboutController', function ($scope) {
 $scope.message = 'Look! I am an about page.';
 });
 
 scotchApp.controller('contactController', function ($scope) {
 $scope.message = 'Contact us! JK. This is just a demo.';
 });*/