$(function () {
    angular.module('app.App').controller('controller.user.Home', ['$cookies', '$location', '$rootScope', '$scope', 'model.service.SessionService', function ($cookies, $location, $rootScope, $scope, SessionService) {
            $scope.logout = function () {
                SessionService.logout(function () {
                    $rootScope.me = {};
                    $cookies.remove('me');
                    $location.path('');
                }, function (res) {

                });
            };
        }]);
});