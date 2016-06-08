/*!
 * @class   CurrentQuestion
 * @details La classe che modella la domanda in esecuzione
 */
$(function () {
    angular.module('CurrentQuestionModule', []).factory('model.data.CurrentQuestion', ['util.QML', function (QML) {
      
    /*!
     * @details costruttore della classe
     * @param[in]  author ID dell'autore della domanda
     * @param[in]  body   e' la rappresentazione testuale della domanda
     * @param[in]  id     ID della Question
     * @param[in]  tags   lista di ID di riferimenti ad argomenti
     */
            function CurrentQuestion(question) {
                var quest = QML.parse(question.body);
                //!oggetto che rappresenta la tipologia della domanda
                this.type = quest.type;
                //!contiene il corpo della domanda corrente 
                this.body = quest.body;
                //!oggetto che rappresenta una lista di risposte
                this.answers = quest.answers;
                if (this.type === 'TF' || this.type === 'MC') {
                    this.answer = quest.answer;
                    //!oggetto che rappresenta la risposta selezionata
                    this.selectedAnswer = null;
                } else if (this.type === "OI") {
                    //!contiene il corpo della domanda corrente
                    this.answer = quest.answer;
                    this.selectedAnswer = quest.answers;
                } else {
                    this.answer = quest.answer;
                    this.selectedAnswer = [];
                }
                this.id = question.id;
                this.stat = [];
                this.right = false;
                this.explanation = quest.explanation;
            }
      
    /*
     * @details restituisce i punti relativi alla domanda risposta
     *          
     *          Metodo che restituisce un oggetto di tipo json con attributi
     *          'point' e 'tot' che contengono due interi rappresentanti i punti
     *          totalizzati sui punti totali del risposta
     */
            CurrentQuestion.prototype.point = function () {
                if (this.type === 'TF' || this.type === 'MC') {
                    if (this.answer.toString() == this.selectedAnswer) {
                        this.right = true;
                        return {point: 1, tot: 1};
                    } else {
                        this.right = false;
                        return {point: 0, tot: 1};
                    }
                } else if (this.type === 'MA') {
                    var rightPoint = 1 / this.answer.length;
                    var wrongPoint = 1 / (this.answers.length - this.answer.length);
                    var tot = 0;
                    var self = this;
                    this.selectedAnswer.forEach(function (ans) {
                        var found = false;
                        self.answer.forEach(function (rightAnswer) {
                            if (ans == rightAnswer) {
                                found = true;
                            }
                        });
                        if (found) {
                            tot += rightPoint;
                        } else {
                            tot -= wrongPoint;
                        }
                    });
                    if (tot < 0) {
                        tot = 0;
                    } else if (tot === 1) {
                        this.right = true;
                    }
                    return {point: tot, tot: 1};
                } else if (this.type === 'CT') {
                    var tot = 0;
                    var point = 0;
                    var self = this;
                    this.selectedAnswer.forEach(function (ans, i) {
                        tot++;
                        if (ans == self.answer[i]) {
                            point++;
                        }
                    });
                    if (point == tot) {
                        this.right = true;
                    }
                    return {point: point / tot, tot: 1};
                } else if (this.type === 'OI') {
                    var right = true;
                    var self = this;

                    this.answer.forEach(function (el, i) {
                        if (el !== self.selectedAnswer[i]) {
                            right = false;
                        }
                    });

                    if (right) {
                        this.right = true;
                        return {point: 1, tot: 1};
                    } else {
                        this.right = false;
                        return {point: 0, tot: 1};
                    }
                }
                return null;
            };

            CurrentQuestion.prototype.answered = function () {
                if (this.type === 'TF' || this.type === 'MC') {
                    return this.selectedAnswer !== null;
                } else if (this.type === 'MA') {
                    return this.selectedAnswer.length !== 0;
                } else if (this.type === 'CT') {
                    var all = true;
                    if (this.selectedAnswer.length < this.answers.length) {
                        all = false;
                    }
                    this.selectedAnswer.forEach(function (ans) {
                        if (ans === null) {
                            all = false;
                        }
                    });
                    return all;
                } else if (this.type === 'OI') {
                    return true;
                }
            };
            return CurrentQuestion;
        }]);
});


                