/*!
 * @class   CurrentQuestionnaire
 * @details La classe che modella il questionario in esecuzione
 */

$(function () {
<<<<<<< HEAD
    angular.module('CurrentQuestionnaireModule', ['QuestionServiceModule', 'CurrentQuestionModule']).factory('model.data.CurrentQuestionnaire', ['$q', 'model.service.QuestionService', 'model.data.CurrentQuestion', 'model.service.AnswerService', function ($q, QuestionService, CurrentQuestion, AnswerService) {
    /*!
     * @details costruttore della classe
     * @param[in]  questions lista di domande del questionario corrente
     * @param[in]  tags      contiene la lista degli argomenti del questionario
     * @param[in]  title     titolo del questionario corrente
     */
=======
    angular.module('CurrentQuestionnaireModule', ['QuestionServiceModule', 'CurrentQuestionModule', 'AnswerServiceModule']).factory('model.data.CurrentQuestionnaire', ['$q', 'model.service.QuestionService', 'model.data.CurrentQuestion', 'model.service.AnswerService', function ($q, QuestionService, CurrentQuestion, AnswerService) {
>>>>>>> ef8e04f0af66e3eae080b77828471f18ce16614e
            function CurrentQuestionnaire(questionnaire) {
                this.id = questionnaire.id;
              //!contiene numero della domanda corrente che si sta eseguendo
                this.currentNumber = 0;
              //!contiene il numero totale delle domande nel questionario corrente
                this.questionNumber = questionnaire.questions.length;
              //!contiene la lista degli argomenti del questionario
                this.tags = questionnaire.tags;
              //!titolo del questionario corrente
                this.title = questionnaire.title;
              //!lista di domande del questionario corrente
                this.questions = questionnaire.questions;
            }

      /*!
       * @details metodo setter
       * @param[in]  questions lista di domande del questionario corrente
       */
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
      
      /*!
       * @details metodo che controlla che tutte le domande abbiano una
       *          risposta data, restituendo vero in caso positivo, falso
       *          altrimenti
       */
            CurrentQuestionnaire.prototype.checkAnswers = function () {
                var ret = true;
                this.questions.forEach(function (item) {
                    ret = ret && (item.answered());
                });
                return ret;
            };

      /*!
       * @details metodo che restituisce un oggetto di tipo json con attributi
       *          'point' e 'tot' che contengono due interi rappresentanti i
       *          punti totalizzati sui punti totali del questionario
       */
            CurrentQuestionnaire.prototype.getResult = function (next) {
                var point = 0;
                var tot = 0;
                var self = this;
                var questions = this.questions;

                async.each(questions, function (item, cll) {
                    var result = item.point();
                    if (result.answer !== null) {
                        point += result.point;
                        tot += result.tot;
                    }
                    
                    AnswerService.get([self.id], [item.id], function (res) {
                        var pt = result.point;
                        var scores = [];

                        res.forEach(function (item) {
                            scores.push(item.score);
                        });

                        var vars = new Set(scores);
                        vars = vars.add(0);
                        vars = vars.add(1);

                        var vars = Array.from(vars).sort();
                        var counters = [];
                        vars.forEach(function () {
                            counters.push(0);
                        });

                        scores.forEach(function (s) {
                            var i = vars.indexOf(s);
                            counters[i]++;
                        });

                        var risp = 0;
                        counters.forEach(function (i) {
                            risp += i;
                        });

                        item.stat.push('Hanno risposto con il massimo del punteggio il <strong>' + Math.round(counters[counters.length - 1] * 100 / risp) + '%</strong> degli studenti');
                        item.stat.push('Hanno risposto con il minimo del punteggio il <strong>' + Math.round(counters[0] * 100 / risp) + '%</strong> degli studenti');

                        var worse = 0, equal = 0, better = 0, myindex = vars.indexOf(pt);
                        for (var i = 0; i < vars.length; i++) {
                            if (i < myindex) {
                                worse += counters[i];
                            } else if (i === myindex) {
                                equal += counters[i];
                            } else {
                                better += counters[i];
                            }
                        }

                        item.stat.push('Hanno risposto meglio di te il <strong>' + Math.round(better * 100 / risp) + '%</strong> degli studenti');
                        item.stat.push('Hanno risposto come te il <strong>' + Math.round(equal * 100 / risp) + '%</strong> degli studenti');
                        item.stat.push('Hanno risposto peggio di te il <strong>' + Math.round(worse * 100 / risp) + '%</strong> degli studenti');

                        AnswerService.new(self, item, result.point, function () {
                            cll();
                        }, function (res) {
                            cll();
                        });
                    }, function (res) {
                        cll();
                    });
                }, function (err, res) {
                    next({point: point, tot: tot});
                });
            };
      /*!
       * @details metodo che ritorna la prossima domanda
       */
            CurrentQuestionnaire.prototype.getNext = function () {
                if (this.currentNumber < this.questionNumber - 1) {
                    this.currentNumber++;
                } else {
                    this.currentNumber = 0;
                }
                return this.questions[this.currentNumber];
            };
      /*!
       * @details metodo che ritorna la domanda precedente
       */
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
