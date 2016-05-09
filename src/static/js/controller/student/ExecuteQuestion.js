$(function () {
    angular.module('app.App').controller('controller.student.ExecuteQuestion', ['$location', '$rootScope', '$scope', '$sce', '$interpolate', function ($location, $rootScope, $scope, $sce, $interpolate) {
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
        }]);
});
