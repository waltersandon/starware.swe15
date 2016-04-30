$(function () {
    angular.module('app.App').controller('controller.public.LogIn', ['util.Check', '$cookies', 'model.data.CurrentUser', 'model.data.Error', '$location', '$scope', '$rootScope', 'model.service.SessionService', 'model.service.UserService', function (Check, $cookies, CurrentUser, Error, $location, $scope, $rootScope, SessionService, UserService) {
            $scope.error = new Error();
            $scope.checkPassword = function () {
                if (Check.checkPassword($scope.password)) {
                    $scope.error.status = false;
                    return true;
                } else {
                    $scope.error.message = 'La password deve avere almeno <strong>6</strong> caratteri';
                    $scope.error.type = 'alert-warning';
                    $scope.error.status = true;
                }
            };
            $scope.checkUserName = function () {
                if (Check.checkUserName($scope.userName)) {
                    $scope.error.status = false;
                    return true;
                } else {
                    $scope.error.message = 'L\'username deve avere almeno <strong>6</strong> caratteri';
                    $scope.error.type = 'alert-warning';
                    $scope.error.status = true;
                }
            };
            $scope.submit = function () {
                SessionService.login($scope.password, $scope.userName, function () {
                    UserService.getMe(function (me) {
                        $rootScope.me = me;
                        $cookies.putObject('me', me);
                        $location.path("user");
                    }, function (res) {
                        $scope.error.message = res.data.message;
                        $scope.error.status = true;
                        $scope.error.type = 'alert-danger';
                    });
                }, function (res) {
                    $scope.error.message = res.data.message;
                    $scope.error.status = true;
                    $scope.error.type = 'alert-danger';
                });
            };
        }]);
});
