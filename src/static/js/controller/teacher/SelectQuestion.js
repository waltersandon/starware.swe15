/**
 * @file SelectQuestion.js
 * @date 18/04/2016
 * @version 2.0
 * @author Thomas Pigarelli
 *
 */

/*!
 * @class   SelectQuestion
 * @details Classe che gestisce la ricerca di una domanda e la sua eventuale
 *          selezione
 * @par Usage 
 * Viene chiamata quando in fase di costruzione di un questionario si ha la
 * necessità di ricercare per poi inserire una particolare domanda
 */
$(function () {
    angular.module('app.App').controller('controller.teacher.SelectQuestion', ['$q', 'model.service.QuestionService', '$scope', 'model.service.TagService', 'model.service.UserService', function ($q, QuestionService, $scope, TagService, UserService) {
    /*!
     * @details trova tutte le domande correlate ad un autore e a delle parole
     *          chiave passati come parametro
     * @param[in]  author        contiene il nome dell'autore della domanda da
     *                            ricercare 
     * @param[in]  keywordsQuery contiene la lista di parole chiave per
     *                            ricercare la domanda
     */
            $scope.submit = function () {
                this.authors = function () {
                    var deferred = $q.defer();

                    if ($scope.authorSearch) {
                        var authorsR = [];
                        $scope.authorSearch.split(',').forEach(function (item) {
                            if (item.trim() !== '') {
                                authorsR.push(item.trim());
                            }
                        });

                        UserService.get(authorsR, null, function (aut) {
                            var list = [];
                            aut.forEach(function (value) {
                                list.push(value.id);
                            });
                            if (list.length > 0) {
                                deferred.resolve(list);
                            } else {
                                deferred.reject('Nessun autore corrispondente');
                            }
                        }, function (res) {
                            deferred.reject();
                        });
                    } else {
                        deferred.resolve([]);
                    }
                    return deferred.promise;
                };

                this.tags = function () {
                    var deferred = $q.defer();

                    if ($scope.tagSearch) {
                        var tagsR = [];
                        $scope.tagSearch.split(',').forEach(function (item) {
                            if (item.trim() !== '') {
                                tagsR.push(item.trim());
                            }
                        });

                        TagService.get(tagsR, function (ta) {
                            var list = [];
                            ta.forEach(function (value) {
                                list.push(value.id);
                            });
                            if (list.length > 0) {
                                deferred.resolve(list);
                            } else {
                                deferred.reject('Nessun argomento corrispondente');
                            }
                        }, function () {
                            deferred.reject();
                        });
                    } else {
                        deferred.resolve([]);
                    }
                    return deferred.promise;
                };

                var bodys = [];
                if ($scope.bodySearch) {
                    bodys = $scope.bodySearch.split(',').map(function (a) {
                        return a.trim();
                    });
                }

                $q.all([this.authors(), this.tags()]).then(function (result) {
                    QuestionService.get(result[0], bodys, result[1], function (questions) {
                        async.each(questions, function (question, cb) {
                            var tags = [];
                            async.each(question.tags, function (tag, cll) {
                                TagService.getByID(tag, function (tagComplete) {
                                    tags.push(tagComplete.name);
                                    cll();
                                }, function (res) {
                                    cll();
                                });
                            }, function (err, res) {
                                question.tags = tags;
                                UserService.getByID(question.author, function (aut) {
                                    question.author = aut.fullName;
                                    cb();
                                }, function (res) {
                                    question.author = '(anonimo)';
                                    cb();
                                });
                            });
                        }, function (err, res) {
                            $scope.questions = questions;
                        });
                    }, function (res) {

                    });
                }, function () {

                });
            };

    /*!
     * @details costruttore della classe
     * @param[in]  questionService campo dati che rappresenta un oggetto
     *                              QuestionService
     * @param[in]  rootScope       oggetto di angular che identifica
     *                              l’elemento con attributo ng-app
     * @param[in]  scope           oggetto di angular che fa riferimento ad una
     *                              porzione di model di pertinenza di uno
     *                              specifico controller
     */
            function SelectQuestion() {
                TagService.get('', function (tags) {
                    $('#tagSearch').bind('keydown', function (event) {
                        if (event.keyCode === $.ui.keyCode.TAB && $(this).autocomplete('instance').menu.active) {
                            event.preventDefault();
                        }
                    }).autocomplete({
                        minLength: 0,
                        source: function (request, response) {
                            response($.ui.autocomplete.filter(function () {
                                var ret = [];
                                tags.forEach(function (item) {
                                    ret.push(item.name);
                                });
                                return ret;
                            }(), request.term.split(/,\s*/).pop()));
                        },
                        focus: function () {
                            return false;
                        },
                        select: function (event, ui) {
                            var terms = this.value.split(/,\s*/);
                            terms.pop();
                            terms.push(ui.item.value);
                            terms.push('');
                            this.value = terms.join(', ');
                            return false;
                        }
                    });
                }, function (res) {

                });
            }

            SelectQuestion();
        }]);
});