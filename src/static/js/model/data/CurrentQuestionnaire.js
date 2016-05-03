$(function () {
    angular.module('CurrentQuestionnaireModule', ['QuestionServiceModule', 'CurrentQuestionModule']).factory('model.data.CurrentQuestionnaire', ['model.service.QuestionService', 'model.data.CurrentQuestion', function (QuestionService, CurrentQuestion) {
        function CurrentQuestionnaire(questionnaire) {
            this.currentNumber = 0;
            this.questionNumber = questionnaire.questions.length;

            var q = [];
            questionnaire.questions.forEach(function (item) {
                QuestionService.getByID(item,function(res){
                    q.push(new CurrentQuestion(res));
                }, function(){

                });
            });

            this.questions = q;
            this.tags = questionnaire.tags;
            this.title = questionnaire.title;
        }

        CurrentQuestionnaire.prototype.checkAnswers = function () {
            var ret = true;

            this.questions.forEach(function (item) {
                if (item.answer === null) {
                    ret = false;
                }
            });
            return ret;
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
});
