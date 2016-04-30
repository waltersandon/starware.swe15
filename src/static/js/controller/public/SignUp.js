$(function () {
    angular.module('app.App').controller('controller.public.SignUp', ['util.Check', '$cookies', '$location', '$scope', 'model.service.SessionService', '$rootScope', 'model.service.UserService', function (Check, $cookies, $location, $scope, SessionService, $rootScope, UserService) {
            $scope.error = new Error();
            $scope.checkFullName = function () {
                if ($scope.fullName) {
                    $scope.error = Check.checkFullName($scope.fullName);
                    return !$scope.error.status;
                } else {
                    return false;
                }
            };
            $scope.checkPassword = function () {
                if ($scope.password) {
                    $scope.error = Check.checkPassword($scope.password);
                    return !$scope.error.status;
                } else {
                    return false;
                }
            };
            $scope.checkUserName = function () {
                if ($scope.userName) {
                    $scope.error = Check.checkUserName($scope.userName);
                    return !$scope.error.status;
                } else {
                    return false;
                }
            };
            $scope.checkRepeatPassword = function () {
                if ($scope.password && $scope.repeatPassword) {
                    console.log($scope.password === $scope.repeatPassword);
                    $scope.error = $scope.password === $scope.repeatPassword ? new Error() : new Error('Le <strong>password</strong> non corrispondono', 'errorRepeatPassword', true, 'alert-warning');
                    console.log(!$scope.error.status);
                    return !$scope.error.status;
                } else {
                    return false;
                }
            };
            $scope.submit = function () {
                UserService.signUp($scope.fullName, $scope.password, $scope.userName, function () {
                    SessionService.login($scope.password, $scope.userName, function () {
                        UserService.getMe(function (me) {
                            $rootScope.me = me;
                            $rootScope.logged = true;

                            var now = new Date();
                            $cookies.putObject('me', me, {expires: new Date(now.getFullYear() + 1, now.getMonth(), now.getDate())});

                            $location.path('user');
                        }, function (res) {
                            $rootScope.logged = false;
                            $scope.error = new Error(res.data.message, 'errorGetMe', true, 'alert-danger');
                        });
                    }, function (res) {
                        $rootScope.logged = false;
                        $scope.error = new Error(res.data.message, 'errorLogin', true, 'alert-danger');
                    });
                }, function (res) {
                    $rootScope.logged = false;
                    $scope.error = new Error(res.data.message, 'errorSignUp', true, 'alert-danger');
                });
            };
        }]);
});