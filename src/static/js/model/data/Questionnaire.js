$(function () {
    angular.module('QuestionnaireModule', []).factory('model.data.Questionnaire', function () {
        function Questionnaire(author, id, questions, tags, title) {
            this.author = typeof author !== 'undefined' ? author : '';
            this.id = typeof id !== 'undefined' ? id : '';
            this.questions = typeof questions !== 'undefined' ? questions : [];
            this.tags = typeof tags !== 'undefined' ? tags : [];
            this.title = typeof title !== 'undefined' ? title : '';
        }
        return Questionnaire;
    });
});