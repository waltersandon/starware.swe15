$(function () {
    angular.module('quizzipediaApp').controller('controller.public.Home', ['$location', '$rootScope', '$scope', function ($location, $rootScope, $scope) {
            $scope.urlPath = function () {
                return $location.path().split('/')[1];
            };
        }]);
});