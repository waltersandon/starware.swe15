$(function () {
    angular.module('app.App').controller('controller.public.Home', ['$location', '$rootScope', '$scope', function ($location, $rootScope, $scope) {
            $scope.urlPath = function () {
                return $location.path().split('/');
            };
        }]);
});