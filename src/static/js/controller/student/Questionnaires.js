/*!
 * @class   Questionnaires
 * @details Classe che si occupa della ricerca di un questionario da parte di
 *          uno studente e dell'eventuale gestione di una richiesta di
 *          esecuzione di un questionario
 * @par Usage
 * Si occupa di gestire la ricerca di un questionario e di permettere ad uno
 * studente di navigare tra i questionari presenti nel sistema per sceglierne
 * eventualmente uno da eseguire
 */

$(function () {
    angular.module('app.App').controller('controller.student.Questionnaires', ['$location', '$scope', '$q', 'model.service.QuestionnaireService', 'model.service.UserService', 'model.service.TagService', function ($location, $scope, $q, QuestionnaireService, UserService, TagService) {
        $scope.titleSearch = '';
        $scope.tagSearch = '';
        $scope.authorSearch = '';
        $scope.questList = [];
        $scope.myOrderBy = 'title';


        /*!
         * @details permette di eseguire il questionario passato come parametro
         *          caricandone la relativa view
         * @param[in]  questID contiene l'ID del questionario da eseguire
         */
        $scope.executeQuestionnaire = function (questID) {
            $location.path('student/questionnaire/' + questID);
        };

        /*!
         * @details permette di ricercare questionari filtrandoli in base ad autore,
         *          titolo e argomenti, richiamando gli opportuni servizi che
         *          mandano la richiesta al server
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
                    }, function () {
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

            var titles = [];
            if ($scope.titleSearch) {
                titles = $scope.titleSearch.split(',').map(function (a) {
                    return a.trim();
                });
            }

            //una volta trovati gli id dei tag e degli autori che corrispondono alla ricerca mi sincronizzo e
            //procedo con la ricerca del questionario
            $q.all([this.authors(), this.tags()]).then(function (result) {
                QuestionnaireService.get(result[0], result[1], titles, function (questionnaires) {
                    async.each(questionnaires, function (questionnaire, cb) {
                        var tags = [];
                        async.each(questionnaire.tags, function (tag, cll) {
                            TagService.getByID(tag, function (tagComplete) {
                                tags.push(tagComplete.name);
                                cll();
                            }, function (res) {
                                cll();
                            });
                        }, function (err, res) {
                            questionnaire.tags = tags;
                            UserService.getByID(questionnaire.author, function (aut) {
                                questionnaire.author = aut.fullName;
                                cb();
                            }, function () {
                                questionnaire.author = '(anonimo)';
                                cb();
                            });
                        });
                    }, function (err, res) {
                        $scope.questList = questionnaires;
                    });
                }, function (res) {

                });
            }, function () {

            });
        };

        /*!
         * @details costruttore della classe
         * @param[in]  userService          campo dati che rappresenta un oggetto
         *                                   UserService
         * @param[in]  questionnaireService campo dati che rappresenta un oggetto
         *                                   QuestionnaireService
         * @param[in]  rootScope            oggetto di angular che identifica
         *                                   l’elemento con attributo ng-app
         * @param[in]  scope                oggetto di angular che fa riferimento
         *                                   ad una porzione di model di pertinenza
         *                                   di uno specifico controller
         * @param[in]  tagService           campo dati che rappresenta un oggetto
         *                                   TagService
         */
        function Questionnaires() {
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

        Questionnaires();
        $scope.submit();
    }]);
});