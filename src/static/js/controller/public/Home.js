$(function () {
    angular.module('quizzipediaApp').controller('controller.public.Home', ['$location', '$scope', function ($location, $scope) {
            $scope.urlPath = function () {
                return $location.path().split('/')[1];
            };
        }]);
});