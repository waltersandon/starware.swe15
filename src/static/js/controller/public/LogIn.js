$(function () {
    angular.module('app.App', ['ngCookies']).controller('controller.public.LogIn', ['$cookies', 'model.data.CurrentUser', '$location', '$scope', '$rootScope', 'model.service.SessionService', 'model.service.UserService', function ($cookies, CurrentUser, $location, $scope, $rootScope, SessionService, UserService) {
            $scope.submit = function () {
                if (SessionService.login($scope.password, $scope.userName)) {
                    $cookies.putObject('me', CurrentUser(UserService.getMe()));
                } else {

                }
            };
        }]);
});
