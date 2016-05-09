$(function () {
    angular.module('QuestionModule', []).factory('model.data.Question', function () {
        function Question(author, body, id, tags) {
            this.author = typeof author !== 'undefined' ? author : '';
            this.body = typeof body !== 'undefined' ? body : '';
            this.id = typeof id !== 'undefined' ? id : '';
            this.tags = typeof tags !== 'undefined' ? tags : [];
        }
        return Question;
    });
});