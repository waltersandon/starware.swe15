$(function () {
    angular.module('app.App').controller('controller.public.LogIn', ['$cookies', 'model.data.CurrentUser', '$location', '$scope', '$rootScope', 'model.service.SessionService', 'model.service.UserService', function ($cookies, CurrentUser, $location, $scope, $rootScope, SessionService, UserService) {
            $scope.submit = function () {
                if (SessionService.login($scope.password, $scope.userName)) {
                    alert('ok');
                    var me = UserService.getMe();
                    $rootScope.me = me;
                    $cookies.putObject('me', me);
                    $location.url('#/user');
                    alert('ok2');
                } else {
                    alert('no ok');
                }
            };
        }]);
});
