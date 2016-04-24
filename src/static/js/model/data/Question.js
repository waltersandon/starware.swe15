$(function () {
    angular.module('QuestionModule', []).factory('model.data.Question', function () {
        function Question(author, body, id, tags) {
            this.author = author;
            this.body = body;
            this.id = id;
            this.tags = tags;
        }
        return Question;
    });
});