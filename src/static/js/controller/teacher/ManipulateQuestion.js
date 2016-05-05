$(function () {
    angular.module('app.App').controller('controller.teacher.ManipulateQuestion', ['model.data.Error', '$location', 'util.QML', 'model.data.Question', 'model.service.QuestionService', '$scope', 'model.data.Tag', 'model.service.TagService', function (Error, $location, QML, Question, QuestionService, $scope, Tag, TagService) {
            $scope.error = new Error();

            $scope.submit = function () {
                if (QML.parse($scope.editor.value()).status) {
                    $scope.question.body = $scope.editor.value();
                    $scope.question.tags = [];

                    async.each($scope.tagsInput.split(','), function (tagInput, cll) {
                        var find = false;
                        $scope.tags.forEach(function (item) {
                            if (item.name === tagInput.trim()) {
                                $scope.question.tags.push(item.id);
                                find = true;
                            }
                        });
                        if (!find) {
                            TagService.new(new Tag('', '', tagInput.trim()), function (res) {
                                $scope.question.tags.push(res._id);
                                cll();
                            }, function (res) {
                                cll();
                            });
                        } else {
                            cll();
                        }
                    }, function (err, res) {
                        if ($scope.edit) {
                            QuestionService.modify($scope.question, function () {
                                $location.path('teacher/questions');
                            }, function (res) {

                            });
                        } else {
                            QuestionService.new($scope.question, function () {
                                $location.path('teacher/questions');
                            }, function (res) {

                            });
                        }
                    });
                } else {
                    $scope.error = new Error(QML.parse($scope.editor.value()).message, 'errorQML', true, 'alert-danger');
                }
            };

            if ($scope.urlPath()[3] === 'new') {
                $scope.question = new Question();
                $scope.edit = false;
                setEditor();
            } else if ($scope.urlPath()[3] === 'modify') {
                QuestionService.getByID($scope.urlPath()[4], function (question) {
                    $scope.question = question;
                    $scope.tagsInput = '';
                    async.each($scope.question.tags, function (tag, cll) {
                        TagService.getByID(tag, function (tagComplete) {
                            $scope.tagsInput += tagComplete.name + ', ';
                            cll();
                        }, function (res) {
                            cll();
                        });
                    }, function (err, res) {
                        $scope.edit = true;
                        setEditor();
                    });
                }, function (res) {
                    $location.path('teacher/questions');
                });
            }

            function setEditor() {
                console.log('a');
                $scope.editor = new SimpleMDE({
                    element: document.getElementById('editor'),
                    previewRender: function (plainText) {
                        return QML.parse(plainText).message;
                    },
                    toolbar: ['bold', 'italic', '|', 'quote', 'unordered-list', 'ordered-list', '|', 'link', 'image', 'guide', '|', 'preview']
                });
                $scope.editor.value($scope.question.body);
            }

            TagService.get('', function (tags) {
                $scope.tags = tags;
            }, function (res) {

            });

            function split(val) {
                return val.split(/,\s*/);
            }

            $('#tags').bind('keydown', function (event) { // don't navigate away from the field on tab when selecting an item
                if (event.keyCode === $.ui.keyCode.TAB && $(this).autocomplete('instance').menu.active) {
                    event.preventDefault();
                }
            }).autocomplete({
                minLength: 0,
                source: function (request, response) { // delegate back to autocomplete, but extract the last term
                    response($.ui.autocomplete.filter(function () {
                        var ret = [];
                        $scope.tags.forEach(function (item) {
                            ret.push(item.name);
                        });
                        return ret;
                    }(), split(request.term).pop()));
                },
                focus: function () { // prevent value inserted on focus
                    return false;
                },
                select: function (event, ui) {
                    var terms = split(this.value);
                    terms.pop(); // remove the current input
                    terms.push(ui.item.value); // add the selected item
                    terms.push(''); // add placeholder to get the comma-and-space at the end
                    this.value = terms.join(', ');
                    return false;
                }
            });
        }]).controller('controller.teacher.ManipulateQuestion.Form', ['$location', '$scope', function ($location, $scope) {
            function preventExit(event) {
                $scope.questionForm.$dirty = $scope.questionForm.$dirty || ($scope.question.body !== $scope.editor.value());
                if (!$scope.questionForm.$dirty || ($scope.questionForm.$dirty && confirm('Sono state apportate modifiche: uscire senza salvare?'))) {
                    $location.path('teacher/questions');
                } else {
                    event.preventDefault();
                }
            }
            
            $scope.$on('$locationChangeStart', function (event) {
                preventExit(event);
            });
            $(window).bind("beforeunload", function (event) {
                preventExit(event);
            });
        }]);
});

