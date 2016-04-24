$(function () {
    angular.module('quizzipediaApp').controller('controller.public.LogIn', ['$location', '$scope', '$rootScope', 'model.service.SessionService', function ($location, $scope, $rootScope, SessionService) {
            $scope.submit = function () {
                if (SessionService.login($scope.password, $scope.userName)) {

                } else {

                }
            };
        }]);
});
