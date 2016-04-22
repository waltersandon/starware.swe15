
angular.module('Questionnaire', []).factory('Questionnaire', function() {
    function Questionnaire(author, questions, tags, title) {
        this.author = author;
        this.questions = questions;
        this.tags = tags;
        this.title = title;
    }
    return Questionnaire;
});
