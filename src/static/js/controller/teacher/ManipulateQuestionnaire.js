/**
 * @file ManipulateQuestionnaire.js
 * @date 18/04/2016
 * @version 2.0
 * @author Nicola De Cao
 *
 */

/*!
 * @class   ManipulateQuestionnaire
 * @details Classe che si occupa della gestione di un questionario lato docente
 * @par Usage 
 * Viene richiamata quando un docente vuole creare un nuovo questionario o
 * modificare o eliminare uno già esistente
 */
$(function () {
    angular.module('app.App').controller('controller.teacher.ManipulateQuestionnaire', ['$timeout', 'model.data.Error', '$location', '$rootScope', 'util.QML', 'model.service.QuestionService', 'model.data.Questionnaire', 'model.service.QuestionnaireService', '$scope', 'model.data.Tag', 'model.service.TagService', 'model.service.UserService', 'util.Util', function ($timeout, Error, $location, $rootScope, QML, QuestionService, Questionnaire, QuestionnaireService, $scope, Tag, TagService, UserService, Util) {
        $scope.error = new Error();
        $scope.onSelect = false;
        $rootScope.dirt = false;

        $scope.textChanged = function(){
            $rootScope.dirt = true;
        };

        /*!
         * @details aggiunge la domanda passata come parametro al questionario
         *          d'istanza
         * @param[in]  question contiene la domanda da aggiungere al
         *                       questionario 
         */
        $scope.addQuestion = function (question) {
            $scope.questionnaire.questions.push(question);
            $scope.onSelect = false;
            $rootScope.dirt = true;
        };
    /*!
     * @details provvede a fornire un'anteprima di una domanda da QML in HTML
     */
        $scope.preview = function (body) {
            return QML.preview(body);
        };
    /*!
     * @details rimuove la domanda passata per parametro dal questionario
     *          d'istanza
     * @param[in]  question contiene la domanda da eliminare dal questionario 
     */
        $scope.removeQuestion = function (question) {
            if(Util.confirm('Sei sicuro di voler rimuovere la domanda dal questionario?')){
                $scope.questionnaire.questions.splice($scope.questionnaire.questions.indexOf(question), 1);
                $rootScope.dirt = true;
            }
        };
    /*!
     * @details metodo setter
     * @param[in]  onSelect indica se si è in fase di selezione di una domanda
     *                       da aggiungere
     */
        $scope.setOnSelect = function (b) {
            $scope.onSelect = b;
        };
    /*!
     * @details dopo aver controllato la validità delle domande, titolo e tags
     *          inseriti, invia i dati presenti nel questionario al servizio che
     *          si occupa di aggiungerlo al sistema
     */
        $scope.submit = function () {
            if ($scope.questionnaire.questions.length > 0) {
                $scope.questionnaire.tags = [];
                async.each($scope.tagsInput.split(','), function (tagInput, cll) {
                    if (tagInput.trim() !== '') {
                        var find = false;
                        $scope.tags.forEach(function (item) {
                            if (item.name === tagInput.trim()) {
                                if ($scope.questionnaire.tags.indexOf(item.id) < 0) {
                                    $scope.questionnaire.tags.push(item.id);
                                    find = true;
                                }
                            }
                        });
                        if (!find) {
                            TagService.new(new Tag('', '', tagInput.trim()), function (res) {
                                $scope.questionnaire.tags.push(res._id);
                                cll();
                            }, function (res) {
                                cll();
                            });
                        } else {
                            cll();
                        }
                    } else {
                        cll();
                    }
                }, function (err, res) {
                    $scope.questionnaire.questions = $scope.questionnaire.questions.map(function (question) {
                        return question.id;
                    });
                    if ($scope.edit) {
                        QuestionnaireService.modify($scope.questionnaire, function () {
                            $location.path('teacher/questionnaires');
                        }, function (res) {

                        });
                    } else {
                        QuestionnaireService.new($scope.questionnaire, function () {
                            $location.path('teacher/questionnaires');
                        }, function (res) {

                        });
                    }
                });
            } else {
                $scope.error = new Error('non è stato selezionata alcuna domanda', 'errorQuestions', true, 'alert-danger');
            }
        };

    /*!
     * @details costruttore della classe
     * @param[in]  questionnaireService campo dati che rappresenta un oggetto
     *                                   QuestionnaireService
     * @param[in]  questionnaire        contiene il riferimento al modello
     *                                   degli questionari 
     * @param[in]  scope                oggetto di angular che fa riferimento
     *                                   ad una porzione di model di pertinenza
     *                                   di uno specifico controller
     * @param[in]  rootScope            oggetto di angular che identifica
     *                                   l’elemento con attributo ng-app
     */

        function ManipulateQuestionnaire() {
            if ($scope.urlPath()[3] === 'new') {
                $scope.questionnaire = new Questionnaire();
                $scope.edit = false;
            } else if ($scope.urlPath()[3] === 'modify') {
                QuestionnaireService.getByID($scope.urlPath()[4], function (questionnaire) {
                    $scope.tagsInput = '';

                    async.each(questionnaire.tags, function (tag, cll) {
                        TagService.getByID(tag, function (tagComplete) {
                            $scope.tagsInput += tagComplete.name + ', ';
                            cll();
                        }, function (res) {
                            cll();
                        });
                    }, function (err, res) {
                        var questions = [];
                        async.each(questionnaire.questions, function (id, cll) {
                            QuestionService.getByID(id, function (question) {
                                UserService.getByID(question.author, function (author) {
                                    question.author = author.fullName;
                                    next();
                                }, function (res) {
                                    question.author = '(anonimo)';
                                    next();
                                });
                                function next() {
                                    var tags = [];
                                    async.each(question.tags, function (idT, cb) {
                                        TagService.getByID(idT, function (tag) {
                                            tags.push(tag.name);
                                            cb();
                                        }, function (res) {
                                            cb();
                                        });
                                    }, function (err, res) {
                                        question.tags = tags;
                                        questions.push(question);
                                        cll();
                                    });
                                }
                            }, function (res) {
                                cll();
                            });
                        }, function (err, res) {
                            questionnaire.questions = questions;
                            $scope.questionnaire = questionnaire;
                        });
                        $scope.edit = true;
                    });
                }, function (res) {
                    $location.path('teacher/questionnaires');
                });
            }

          
            TagService.get('', function (tags) {
                $scope.tags = tags;

                $('#tags').bind('keydown', function (event) {
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
                        $timeout(function () {
                            $scope.tagsInput = $("#tags").val();
                        }, 10);
                        return false;
                    }
                });
            }, function (res) {

            });
        }

        ManipulateQuestionnaire();
    }]);
});