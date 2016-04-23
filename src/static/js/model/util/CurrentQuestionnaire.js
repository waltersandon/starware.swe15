
angular.module('CurrentQuestionnaireModule', ['QuestionServiceModule']).factory('CurrentQuestionnaire', ['QuestionService', function (QuestionService) {
    function CurrentQuestionnaire(questionnaire) {
        this.currentNumber = 0;
        this.questionNumber = questionnaire.length;
        
        var q = [];
        questionnaire.questions.forEach(function (item) {
            q.push(QuestionService.getByID(item));
        });
        
        this.questions = q;
        this.tags = questionnaire.tags;
    }
    CurrentQuestionnaire.prototype.checkAnswers = function () {
        this.questions.forEach(function (item) {
            if (item === null) {
                return false;
            }
        });
        return true;
    };
    CurrentQuestionnaire.prototype.getNext = function () {
        if (this.currentNumber < this.questionNumber - 1) {
            this.currentNumber++;
        } else {
            this.currentNumber = 0;
        }
        return this.questions[this.currentNumber];
    };
    CurrentQuestionnaire.prototype.getPrevious = function () {
        if (this.currentNumber > 0) {
            this.currentNumber--;
        } else {
            this.currentNumber = this.questionNumber - 1;
        }
        return this.questions[this.currentNumber];
    };

    return CurrentQuestionnaire;
}]);
