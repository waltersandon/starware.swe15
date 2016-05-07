$(function () {
    angular.module('app.App').controller('controller.teacher.ManipulateQuestionnaire', ['model.data.Error', '$location', 'util.QML', 'model.service.QuestionService', 'model.data.Questionnaire', 'model.service.QuestionnaireService', '$scope', 'model.data.Tag', 'model.service.TagService', 'model.service.UserService', function (Error, $location, QML, QuestionService, Questionnaire, QuestionnaireService, $scope, Tag, TagService, UserService) {
            $scope.error = new Error();
            $scope.onSelect = false;
            $scope.removeQuestion = function (question) {
                $scope.questionnaire.questions.splice($scope.questionnaire.questions.indexOf(question), 1);
            };
            $scope.setOnSelect = function (b) {
                $scope.onSelect = b;
            };
            $scope.addQuestion = function (question) {
                $scope.questionnaire.questions.push(question);
                $scope.onSelect = false;
            };
            $scope.submit = function () {
                console.log('lol');
                if ($scope.questionnaire.questions.length > 0) {
                    $scope.questionnaire.tags = [];
                    async.each($scope.tagsInput.split(','), function (tagInput, cll) {
                        console.log('lol');
                        if (tagInput.trim() !== '') {
                            console.log('lol');
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
                        console.log('lol');
                        $scope.questionnaire.questions = $scope.questionnaire.questions.map(function (question) {
                            return question.id;
                        });
                        console.log('lol');
                        if ($scope.edit) {
                            QuestionnaireService.modify($scope.questionnaire, function () {
                                $location.path('teacher/questionnaires');
                            }, function (res) {

                            });
                        } else {
                            console.log('lol');
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

            if ($scope.urlPath()[3] === 'new') {
                $scope.questionnaire = new Questionnaire();
                $scope.edit = false;
            } else if ($scope.urlPath()[3] === 'modify') {
                QuestionnaireService.getByID($scope.urlPath()[4], function (questionnaire) {
                    $scope.questionnaire = questionnaire;
                    $scope.tagsInput = '';

                    async.each($scope.questionnaire.tags, function (tag, cll) {
                        TagService.getByID(tag, function (tagComplete) {
                            $scope.tagsInput += tagComplete.name + ', ';
                            cll();
                        }, function (res) {
                            cll();
                        });
                    }, function (err, res) {
                        var questions = [];
                        async.each($scope.questionnaire.questions, function (id, cll) {
                            QuestionService.getByID(id, function (question) {
                                UserService.getByID(question.author, function (author) {
                                    question.author = author.fullName;
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
                                }, function (res) {
                                    cll();
                                });
                            }, function (res) {
                                cll();
                            });
                        }, function (err, res) {
                            $scope.questionnaire.questions = questions;

                            $scope.preview = function (body) {
                                return QML.preview(body);
                            };
                        });
                        $scope.edit = true;
                    });
                }, function (res) {
                    $location.path('teacher/questionnaire');
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
                        return false;
                    }
                });
            }, function (res) {

            });

        }]);
});