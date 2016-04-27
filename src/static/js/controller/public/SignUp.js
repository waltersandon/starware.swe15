$(function () {
    angular.module('app.App').controller('controller.public.SignUp', ['util.Check', '$location', '$scope', '$rootScope', 'model.service.UserService', function (check, $location, $scope, $rootScope, userService) {
            $scope.checkPassword = function () {

            };
            $scope.checkUserName = function () {

            };
            $scope.checkRepeatPassword = function () {

            };
            $scope.submit = function () {
                if (userService.signUp($scope.fullName, $scope.password, $scope.userName)) {

                } else {

                }
            };
        }]);
});