$(function () {
    angular.module('app.App').controller('controller.student.ExecuteQuestion', ['$location', '$rootScope', '$scope', '$sce', function ($location, $rootScope, $scope, $sce) {
        $scope.$watch('currentQuestion', function(){
            if($scope.currentQuestion) {
                $scope.preview = markdown.toHTML($scope.currentQuestion.body);
                $scope.responses = $sce.trustAsHtml($scope.currentQuestion.responses);
            }
        });

        $scope.submitResponse = function(val){
            console.log(val);
        };

        $scope.$watch('value', function(){
            console.log("valore", $scope.value);
            $scope.value = true;
        });
    }]);
});