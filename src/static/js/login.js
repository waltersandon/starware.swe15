$(function () {
    $.material.init();
});

var app = angular.module('myApp', []);

app.controller('LogIn', ['$location', '$scope', '$rootScope', 'SessionService', function ($location, $scope, $rootScope, SessionService) {
        $scope.submit = function () {
            SessionService.login($scope.password, $scope.userName);
        };
    }]);


app.factory('SessionService', ['$http', function ($http) {
        return {
            login: function (password, userName) {
                console.log('lol' + userName + ' ' + password);
                $http.post('/session', {
                    'password': password,
                    'userName': userName
                }).then(function successCallback(response) {
                    console.log('successCallback' + response);
                }, function errorCallback(response) {
                    console.log('errorCallback' + response);
                });
            },
            logout: function () {
                $http.delete('/session').then(function successCallback(response) {
                    console.log('successCallback' + response);
                }, function errorCallback(response) {
                    console.log('errorCallback' + response);
                });
            }
        };
    }]);




