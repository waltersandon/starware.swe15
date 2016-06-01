$(function () {
    angular.module('app.App').controller('controller.student.ExecuteQuestion', ['$scope', '$sce', '$interpolate', function ($scope, $sce, $interpolate) {

        $scope.ris = {};

        $scope.$watch('currentQuestion', function () {
            if ($scope.currentQuestion) {
                $scope.ris.value = $scope.currentQuestion.selectedAnswer;
                if($scope.currentQuestion.type === "TF" || $scope.currentQuestion.type === "MC" || $scope.currentQuestion.type === "MA"){
                    $scope.preview = $sce.trustAsHtml($interpolate($scope.currentQuestion.body)($scope));
                }
                else if($scope.currentQuestion.type === "CT"){
                    $scope.preview = [];
                    $scope.currentQuestion.body.forEach(function(b){
                        $scope.preview.push($sce.trustAsHtml($interpolate(b)($scope)));
                    });
                }
            }
        });

        $scope.$watch('ris.value', function () {
            $scope.changeAnswer();
        });

        $scope.changeAnswer = function(){
            if ($scope.currentQuestion) {
                $scope.currentQuestion.selectedAnswer = $scope.ris.value;
            }
        };

        $scope.trust = function(str){
            return $sce.trustAsHtml(str);
        };

    }]);
});
