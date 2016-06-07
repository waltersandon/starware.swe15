$(function () {
    angular.module('app.App').controller('controller.student.ExecuteQuestion', ['$scope', '$sce', '$interpolate', function ($scope, $sce, $interpolate) {

        $scope.ris = {};

        $scope.$watch('currentQuestion', function () {
            if ($scope.currentQuestion) {
                $scope.ris.value = $scope.currentQuestion.selectedAnswer;
                if ($scope.currentQuestion.type === "TF" || $scope.currentQuestion.type === "MC" || $scope.currentQuestion.type === "MA"
                    || $scope.currentQuestion.type === "OI" || $scope.currentQuestion.type === "CI") {
                    $scope.preview = $sce.trustAsHtml($interpolate($scope.currentQuestion.body)($scope));
                } else if ($scope.currentQuestion.type === "CT") {
                    $scope.preview = [];
                    $scope.currentQuestion.body.forEach(function (b) {
                        $scope.preview.push($sce.trustAsHtml($interpolate(b)($scope)));
                    });
                }
            }
        });

        $scope.$watch('ris.value', function () {
            $scope.changeAnswer();
        });

        $scope.changeAnswer = function () {
            if ($scope.currentQuestion) {
                $scope.currentQuestion.selectedAnswer = $scope.ris.value;
            }
        };

        setInterval(function () {
            $(".sortable").sortable({
                placeholder: "ui-state-highlight",
                update: function (event, ui) {
                    if ($scope.currentQuestion.type === "OI") {
                        $scope.ris.value = [];
                        $('.sortable li').each(function (e) {
                            $scope.ris.value.push($(this).attr('id'));
                        });
                    }
                    else if ($scope.currentQuestion.type === "CI") {
                        $scope.ris.value = {left: [], right: []};
                        $('.sortable:first li').each(function (e) {
                            $scope.ris.value.left.push($(this).attr('id'));
                        });
                        $('.sortable:nth-child(2) li').each(function (e) {
                            $scope.ris.value.right.push($(this).attr('id'));
                        });
                    }
                    $scope.changeAnswer();
                },
                disabled: !$scope.edit
            });
            $(".sortable").disableSelection();
        }, 1000);

        $scope.trust = function (str) {
            return $sce.trustAsHtml(str);
        };

    }]);
});
