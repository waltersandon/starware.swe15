$(function () {
    angular.module('CurrentQuestionnaireModule', ['QuestionServiceModule', 'CurrentQuestionModule']).factory('model.data.CurrentQuestionnaire', ['$q', 'model.service.QuestionService', 'model.data.CurrentQuestion', 'model.service.AnswerService', function ($q, QuestionService, CurrentQuestion, AnswerService) {
            function CurrentQuestionnaire(questionnaire) {
                this.id = questionnaire.id;
                this.currentNumber = 0;
                this.questionNumber = questionnaire.questions.length;

                this.tags = questionnaire.tags;
                this.title = questionnaire.title;
                this.questions = questionnaire.questions;
            }

            CurrentQuestionnaire.prototype.getCurrentQuestions = function () {
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
                    ret = ret && (item.answered());
                });
                return ret;
            };

            CurrentQuestionnaire.prototype.getResult = function (next) {
                var point = 0;
                var tot = 0;
                var id = this.id;
                var questions = this.questions;

                async.each(questions, function (item, cll) {
                    var result = item.point();
                    if (result.answer !== null) {
                        point += result.point;
                        tot += result.tot;
                    }

                    AnswerService.new(id, item.id, result.point, function () {
                        /*AnswerService.get(id, item.id, function (res) {
                            /*var pt = result.point;
                            var scores = [];
                            
                            res.forEach(function (item) {
                                scores.push(item.score);
                            });
                            
                            var vars = Array.from(new Set(scores)).sort();
                            var couters = [0 for i of vars];
                            
                            scores.forEach(function (s) {
                                switch (s){
                                    case 0:
                                        zeros++;
                                        break;
                                    case 1:
                                        ones++;
                                        break;
                                    default:
                                        
                                }
                            });
                            
                            cll();
                        }, function (res) {
                            cll();
                        });*/
                        cll();
                    }, function (res) {
                        cll();
                    });
                }, function (err, res) {
                    next({point: point, tot: tot});
                });
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
