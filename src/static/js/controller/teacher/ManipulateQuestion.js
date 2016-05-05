$(function () {
    angular.module('app.App').controller('controller.teacher.ManipulateQuestion', ['$location', 'util.QML', 'model.service.QuestionService', '$rootScope', '$scope', function ($location, QML, QuestionService, $rootScope, $scope) {

            $scope.foo = function () {
                console.log('lol');
                console.log($scope.editor.value());
            };
            QuestionService.getByID($scope.urlPath()[4], function (question) {
                $scope.question = question;
                $scope.editor = new SimpleMDE({
                    element: document.getElementById('editor'),
                    previewRender: function (plainText) {
                        var parsing = QML.parse(plainText);
                        if(parsing.status) {
                            return parsing.body + parsing.answerForm;
                        }
                        else{
                            return parsing.message;
                        }
                    },
                    toolbar: ['bold', 'italic', '|', 'quote', 'unordered-list', 'ordered-list', '|', 'link', 'image', 'table', 'guide', '|', 'preview'] //finire
                });


                /*
                 <MultipleChoice>
                 **sdf**
                 [answers]
                 [] f
                 [*] esdf
                 * 
                 */

                $scope.editor.value(question.body);

            }, function (res) {

            });
            $scope.xsss = '$scope.simplemde.value()';

        }]);
});

