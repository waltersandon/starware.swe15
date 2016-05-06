$(function () {
    angular.module('QuestionnaireModule', []).factory('model.data.Questionnaire', function () {
        function Questionnaire(author, id, questions, tags, title) {
            this.author = author || '';
            this.id = id || '';
            this.questions = questions || [];
            this.tags = tags || [];
            this.title = title || '';
        }
        return Questionnaire;
    });
});