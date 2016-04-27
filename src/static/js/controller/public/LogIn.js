$(function () {
    angular.module('app.App').controller('controller.public.LogIn', ['$location', '$scope', '$rootScope', 'model.service.SessionService', function ($location, $scope, $rootScope, sessionService) {
            $scope.submit = function () {
                if (sessionService.login($scope.password, $scope.userName)) {

                } else {

                }
            };
        }]);
});
