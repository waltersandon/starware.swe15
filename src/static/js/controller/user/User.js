$(function () {
    angular.module('app.App').controller('controller.user.User', ['util.Check', 'model.data.Error', '$location', '$rootScope', '$scope', 'model.service.UserService', function (Check, Error, $location, $rootScope, $scope, UserService) {
            $scope.errorInformation = new Error();
            $scope.errorPassword = new Error();
            $scope.fullName = $rootScope.me.fullName;
            $scope.userName = $rootScope.me.userName;
            $scope.checkFullName = function () {
                if ($scope.fullName) {
                    $scope.errorInformation = Check.checkFullName($scope.fullName);
                    return !$scope.errorInformation.status;
                } else {
                    return false;
                }
            };
            $scope.checkPassword = function () {
                if ($scope.newPassword) {
                    $scope.errorPassword = Check.checkPassword($scope.newPassword);
                    return !$scope.errorPassword.status;
                } else {
                    return false;
                }
            };
            $scope.checkUserName = function () {
                if ($scope.userName) {
                    $scope.errorInformation = Check.checkUserName($scope.userName);
                    return !$scope.errorInformation.status;
                } else {
                    return false;
                }
            };
            $scope.checkRepeatPassword = function () {
                if ($scope.newPassword && $scope.repeatPassword) {
                    $scope.errorPassword = $scope.newPassword === $scope.repeatPassword ? new Error() : new Error('Le <strong>password</strong> non corrispondono', 'errorRepeatPassword', true, 'alert-warning');
                    return !$scope.errorPassword.status;
                } else {
                    return false;
                }
            };
            $scope.submitInformation = function () {
                UserService.updateInformation($scope.fullName, $scope.userName, function () {
                    $scope.successInformation = true;
                }, function (res) {
                    $scope.errorInformation = new Error(res.data.message, 'errorInformation', true, 'alert-danger');
                });
            };
            $scope.submitPassword = function () {
                UserService.updatePassword($scope.newPassword, $scope.oldPassword, function () {
                    $scope.successPassword = true;
                }, function (res) {
                    $scope.errorPassword = new Error(res.data.message, 'errorPassword', true, 'alert-danger');
                });
            };
        }]);
});
