$(function () {
    angular.module('app.App').controller('controller.user.Home', ['$cookies', '$rootScope', '$scope', 'model.service.SessionService', function ($cookies, $rootScope, $scope, SessionService) {
            $scope.logout = function () {
                SessionService.logout(function () {
                    $rootScope.me = {};
                    $rootScope.logged = false;
                    $cookies.remove('connect.sid');
                    $cookies.remove('me');
                }, function (res) {

                });
            };
        }]);
});