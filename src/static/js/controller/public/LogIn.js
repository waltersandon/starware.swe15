$(function () {
    angular.module('app.App').controller('controller.public.LogIn', ['util.Check', '$cookies', 'model.data.CurrentUser', 'model.data.Error', '$location', '$scope', '$rootScope', 'model.service.SessionService', 'model.service.UserService', function (Check, $cookies, CurrentUser, Error, $location, $scope, $rootScope, SessionService, UserService) {
            $scope.error = new Error();
            $scope.checkPassword = function () {
                if ($scope.password) {
                    $scope.error = Check.checkPassword($scope.password);
                }
            };
            $scope.checkUserName = function () {
                if ($scope.userName) {
                    $scope.error = Check.checkUserName($scope.userName);
                }
            };
            $scope.submit = function () {
                SessionService.login($scope.password, $scope.userName, function () {
                    UserService.getMe(function (me) {
                        $rootScope.me = me;
                        $cookies.putObject('me', me);
                        $location.path("user");
                    }, function (res) {
                        $scope.error = new Error(res.data.message, 'errorGetMe', true, 'alert-danger');
                    });
                }, function (res) {
                    $scope.error = new Error(res.data.message, 'errorLogin', true, 'alert-danger');
                });
            };
        }]);
});
