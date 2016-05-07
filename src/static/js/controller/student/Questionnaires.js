$(function () {
    angular.module('app.App').controller('controller.student.Questionnaires', ['$location', '$rootScope', '$scope', '$q', 'model.service.QuestionnaireService', 'model.service.UserService', 'model.service.TagService', function ($location, $rootScope, $scope, $q, QuestionnaireService, UserService, TagService) {
            $scope.titleSearch = '';
            $scope.tagSearch = '';
            $scope.authorSearch = '';

            $scope.questList = [];
            $scope.myOrderBy = "title";

            $scope.submit = function () {
                this.authors = function () {

                    var deferred = $q.defer();

                    if ($scope.authorSearch) {
                        UserService.get($scope.authorSearch.split(' '), null, function (aut) {
                            var list = [];
                            aut.forEach(function (value, index) {
                                list.push(value.id);
                            });
                            if (list.length > 0) {
                                deferred.resolve(list);
                            } else {
                                deferred.reject("Nessun autore corrispondente");
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
                        TagService.get($scope.tagSearch.split(' '), function (ta) {
                            var list = [];
                            ta.forEach(function (value, index) {
                                list.push(value.id);
                            });
                            if (list.length > 0) {
                                deferred.resolve(list);
                            } else {
                                deferred.reject("Nessun autore corrispondente");
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
                    titles = $scope.titleSearch.split(' ');
                }

                //una volta trovati gli id dei tag e degli autori che corrispondono alla ricerca mi sincronizzo e
                //procedo con la ricerca del questionario
                $q.all([this.authors(), this.tags()]).then(function (result) {
                    QuestionnaireService.get(result[0], result[1], titles, function (questionnaires) {
                        var tags = [];
                        async.each(questionnaires, function (questionnaire, cb) {
                            async.each(questionnaire.tags, function (tag, cll) {
                                TagService.getByID(tag, function (tagComplete) {
                                    tags.push(tagComplete.name);
                                    cll();
                                }, function () {
                                    cll();
                                });
                            }, function () {
                                questionnaire.tags = tags;
                                UserService.getByID(questionnaire.author, function (aut) {
                                    questionnaire.author = aut.fullName;
                                    cb();
                                }, function () {
                                    cb();
                                });
                            });
                        }, function () {
                            $scope.questList = questionnaires;
                        });
                    }, function (err) {
                        $questList = [];
                    });
                }, function () {
                    //Utenti o tag corrispondenti alla ricerca non trovati
                    $scope.questList = [];
                });


            };

            $scope.executeQuestionnaire = function (questID) {
                $location.path('student/questionnaire/' + questID);
            };

        }]);
});