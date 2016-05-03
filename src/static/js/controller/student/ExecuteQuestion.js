$(function () {
    angular.module('app.App').controller('controller.student.ExecuteQuestion', ['$location', '$rootScope', '$scope', function ($location, $rootScope, $scope) {

        $rootScope.$watch('curQuestion', function(){
            console.log($rootScope.curQuestion);
        });
        
    }]);
});