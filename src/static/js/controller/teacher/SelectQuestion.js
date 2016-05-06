$(function () {
    angular.module('app.App').controller('controller.teacher.SelectQuestion', ['$location', '$q', 'model.service.QuestionService', '$scope', 'model.service.TagService', 'model.service.UserService', function ($location, $q, QuestionService, $scope, TagService, UserService) {

            $scope.myOrderBy = 'body';

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


        }]);
});