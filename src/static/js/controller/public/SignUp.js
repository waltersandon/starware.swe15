$(function () {
    angular.module('quizzipediaApp').controller('controller.public.SignUp', ['model.util.Check', '$location', '$scope', '$rootScope', 'model.service.UserService', function (check, $location, $scope, $rootScope, userService) {
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