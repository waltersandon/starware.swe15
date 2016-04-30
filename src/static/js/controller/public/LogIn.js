$(function () {
    angular.module('app.App').controller('controller.public.LogIn', ['util.Check', '$cookies', 'model.data.Error', '$location', '$scope', '$rootScope', 'model.service.SessionService', 'model.service.UserService', function (Check, $cookies, Error, $location, $scope, $rootScope, SessionService, UserService) {
            $scope.error = new Error();
            $scope.checkPassword = function () {
                if ($scope.password) {
                    $scope.error = Check.checkPassword($scope.password);
                    return !$scope.error.status;
                }
            };
            $scope.checkUserName = function () {
                if ($scope.userName) {
                    $scope.error = Check.checkUserName($scope.userName);
                    return !$scope.error.status;
                }
            };
            $scope.submit = function () {
                SessionService.login(md5($scope.password), $scope.userName, function () {
                    UserService.getMe(md5($scope.password), function (me) {
                        $rootScope.me = me;

                        var now = new Date();
                        $cookies.putObject('me', me, {expires: new Date(now.getFullYear() + 1, now.getMonth(), now.getDate())});

                        $location.path('user');
                    }, function (res) {
                        $rootScope.me = false;
                        $scope.error = new Error(res.data.message, 'errorGetMe', true, 'alert-danger');
                    });
                }, function (res) {
                    $rootScope.me = false;
                    $scope.error = new Error(res.data.message, 'errorLogin', true, 'alert-danger');
                });
            };
        }]);
});
