$(function () {
    angular.module('CurrentQuestionnaireModule', ['QuestionServiceModule', 'CurrentQuestionModule']).factory('model.data.CurrentQuestionnaire', ['$q', 'model.service.QuestionService', 'model.data.CurrentQuestion', function ($q, QuestionService, CurrentQuestion) {
        function CurrentQuestionnaire(questionnaire) {
            this.currentNumber = 0;
            this.questionNumber = questionnaire.questions.length;

            this.tags = questionnaire.tags;
            this.title = questionnaire.title;
            this.questions = questionnaire.questions;
        }

        CurrentQuestionnaire.prototype.getCurrentQuestions = function(){
            var deferred = $q.defer();

            var q = [];
            async.each(this.questions, function (question, cll) {
                QuestionService.getByID(question, function (res) {
                    q.push(new CurrentQuestion(res));
                    cll();
                }, function () {
                    cll();
                });
            }, function () {
                deferred.resolve(q);
            });

            return deferred.promise;
        };

        CurrentQuestionnaire.prototype.checkAnswers = function () {
            var ret = true;
            this.questions.forEach(function (item) {
                if (item.selectedAnswer === null || (item.selectedAnswer instanceof Array && item.selectedAnswer.length === 0)) {
                    ret = false;
                }
            });
            return ret;
        };

        CurrentQuestionnaire.prototype.getResult = function () {
            var point = 0;
            var tot = 0;

            this.questions.forEach(function (item) {
                var result = item.point();
                if (result.answer !== null) {
                    point += result.point;
                    tot += result.tot;
                }
            });
            return {point: point, tot: tot};
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
