$(function () {
    angular.module('quizzipediaApp').controller('LogInController', ['$location', '$scope', '$rootScope', 'SessionService', function ($location, $scope, $rootScope, SessionService) {
            $scope.submit = function () {
                if (SessionService.login($scope.password, $scope.userName)) {

                } else {

                }
            };
        }]);
});
