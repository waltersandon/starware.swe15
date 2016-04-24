$(function () {
    angular.module('CurrentQuestionModule', []).factory('model.util.CurrentQuestion', function () {
        function CurrentQuestion(question) {
            this.answer = null;
            this.body = question.body;
            this.options = 'options'; /* TODO */
        }
        return CurrentQuestion;
    });
});