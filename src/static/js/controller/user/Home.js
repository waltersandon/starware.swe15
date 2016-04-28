$(function () {
    angular.module('app.App').controller('controller.user.Home', ['$location', '$rootScope', '$scope', 'model.service.SessionService', function ($location, $rootScope, $scope, SessionService) {
            $scope.logout = function () {
                SessionService.logout(function () {

                }, function () {

                });
            };
        }]);
});