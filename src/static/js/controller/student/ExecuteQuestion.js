$(function () {
    angular.module('app.App').controller('controller.student.ExecuteQuestion', ['$scope', '$sce', '$interpolate', function ($scope, $sce, $interpolate) {

        $scope.ris = {};

        $scope.$watch('currentQuestion', function () {
            if ($scope.currentQuestion) {
                $scope.ris.value = $scope.currentQuestion.selectedAnswer;
                $scope.preview = $sce.trustAsHtml($interpolate($scope.currentQuestion.body)($scope));
            }
        });

        $scope.$watch('ris.value', function () {
            if ($scope.currentQuestion) {
                $scope.currentQuestion.selectedAnswer = $scope.ris.value;
            }
        });

        $scope.trust = function(str){
            return $sce.trustAsHtml(str);
        };

    }]);
});
