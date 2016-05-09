$(function () {
    angular.module('app.App').controller('controller.student.ExecuteQuestion', ['$scope', '$sce', '$interpolate', function ($scope, $sce, $interpolate) {
            $scope.$watch('currentQuestion', function () {
                if ($scope.currentQuestion) {
                    $scope.ris = $scope.currentQuestion.selectedAnswer;
                    $scope.preview = $sce.trustAsHtml($interpolate($scope.currentQuestion.body)($scope));
                }
            });

            $scope.$watch('ris', function () {
                if ($scope.currentQuestion) {
                    $scope.currentQuestion.selectedAnswer = $scope.ris;
                }
            });
            function foo(res) {
                var scope = angular.element($("#outer")).scope();
                scope.$apply(function () {
                    scope.ans = res;
                });
            }
        }]);
});
