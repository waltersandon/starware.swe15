$(function () {
    angular.module('app.App').controller('controller.teacher.ManipulateQuestion', ['$location', 'model.service.QuestionService', '$rootScope', '$scope', function ($location, QuestionService, $rootScope, $scope) {

            $scope.foo = function (){
                console.log('lol');
                console.log($scope.simplemde.value());
            };
            QuestionService.getByID($scope.urlPath()[4], function (question) {
                $scope.question = question;
                $scope.simplemde = new SimpleMDE({
                    element: document.getElementById('editor'),
                    toolbar: ['bold', 'italic', '|', 'quote', 'unordered-list', 'ordered-list', '|', 'link', 'image', 'table', 'guide'] //finire
                });
 
                $scope.simplemde.value(question.body);
                
            }, function (res) {

            });
            $scope.xsss = '$scope.simplemde.value()';

        }]);
});

