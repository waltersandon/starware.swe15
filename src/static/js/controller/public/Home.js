$(function () {
    angular.module('quizzipediaApp').controller('HomeController', ['$location', '$scope', function ($location, $scope) {
            $scope.urlPath = function () {
                return $location.path().split('/')[1];
            };
        }]);
});