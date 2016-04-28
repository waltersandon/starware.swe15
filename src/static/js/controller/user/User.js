$(function () {
    angular.module('app.App').controller('controller.user.User', ['$location', '$rootScope', '$scope', 'model.service.UserService', function ($location, $rootScope, $scope, UserService) {
            /*var me = userService.getMe();
             
             $scope.fullName = me.fullName;
             $scope.newPassword = '';
             $scope.oldPasword = '';
             $scope.repeatPassword = '';
             $scope.userName = me.userName;*/

            $scope.submitInformation = function () {
                UserService.updateInformation($scope.fullName, $scope.userName, function () {

                }, function () {

                });
            };
            $scope.submitPassword = function () {
                UserService.updatePassword($scope.newPassword, $scope.oldPasword, function () {

                }, function () {

                });
            };
        }]);
});



