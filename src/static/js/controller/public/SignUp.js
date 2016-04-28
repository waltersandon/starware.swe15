$(function () {
    angular.module('app.App').controller('controller.public.SignUp', ['util.Check', '$location', '$scope', '$rootScope', 'model.service.UserService', function (check, $location, $scope, $rootScope, UserService) {
            $scope.checkPassword = function () {

            };
            $scope.checkUserName = function () {

            };
            $scope.checkRepeatPassword = function () {

            };
            $scope.submit = function () {
                UserService.signUp($scope.fullName, $scope.password, $scope.userName, function () {
                    
                }, function () {
                    
                });
            };
        }]);
});