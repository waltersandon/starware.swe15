$(function () {
    angular.module('app.App').controller('controller.user.Welcome', ['$location', '$rootScope', '$scope', function ($location, $rootScope, $scope) {
        $scope.fullName = $rootScope.me.fullName;
    }]);
});