$(function () {
    angular.module('quizzipediaApp').controller('controller.user.Home', ['$location', '$rootScope', '$scope', 'model.service.SessionService', function ($location, $rootScope, $scope, sessionService) {
            $scope.logout = function () {
                if (sessionService.logout()) {

                } else {

                }
            };
        }]);
});