 
angular.module('Question', []).factory('Question', function() {
    function Question(author, body, tags) {
        this.author = author;
        this.body = body;
        this.tags = tags;
    }
    return Question;
});
