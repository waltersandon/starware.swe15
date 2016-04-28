$(function () {
    angular.module('CurrentQuestionnaireModule', ['QuestionServiceModule']).factory('model.data.CurrentQuestionnaire', ['model.service.QuestionService', function (QuestionService) {
            function CurrentQuestionnaire(questionnaire) {
                this.currentNumber = 0;
                this.questionNumber = questionnaire.length;

                var q = [];
                questionnaire.questions.forEach(function (item) {
                    q.push(QuestionService.getByID(item.id));
                });

                this.questions = q;
                this.tags = questionnaire.tags;
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