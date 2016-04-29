$(function () {
    angular.module('app.App').controller('controller.public.SignUp', ['util.Check', '$location', '$scope', '$rootScope', 'model.service.UserService', function (Check, $location, $scope, $rootScope, UserService) {
            $scope.error_user = false;
            $scope.checkPassword = function () {
                if (Check.checkPassword($scope.password)) {

                } else {

                }
            };
            /*$scope.checkUserName = function () {
             Check.checkUserName($scope.userName, function (ret) {
             $scope.error_user = ret;
             }, function () {
             
             });
             };*/
            $scope.checkRepeatPassword = function () {
                    
            };
            $scope.submit = function () {
                UserService.signUp($scope.fullName, $scope.password, $scope.userName, function () {

                }, function () {

                });
            };
        }]);
});