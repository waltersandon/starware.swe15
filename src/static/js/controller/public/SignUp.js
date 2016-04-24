$(function () {
    angular.module('quizzipediaApp').controller('controller.public.SignUp', ['$location', '$scope', '$rootScope', 'model.service.UserService', function ($location, $scope, $rootScope, UserService) {
            $scope.submit = function () {
                if (UserService.signUp($scope.fullName, $scope.password, $scope.userName)) {

                } else {

                }
            };
        }]);
});