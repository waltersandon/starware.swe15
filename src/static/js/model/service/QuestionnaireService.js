$(function () {
    angular.module('QuestionnaireServiceModule', ['ConfigurationModule', 'QuestionnaireModule']).service('model.service.QuestionnaireService', ['app.Configuration', '$http', 'model.data.Questionnaire', function (Configuration, $http, Questionnaire) {
            this.delete = function (questionnaire, next, err) {
                $http.delete(Configuration.remote + 'api/questionnaires/' + questionnaire.id).then(function success(res) {
                    console.log(res);
                    next();
                }, function error(res) {
                    console.log(res);
                    err(res);
                });
            };
            this.get = function (author, tags, title, next, err) {
                console.log(author,tags,title);
                $http.get(Configuration.remote + 'api/questionnaires?' +
                        'author=' + function () {
                            var a = '';
                            if (author instanceof Array)
                                author.forEach(function (item) {
                                    a += item + '|';
                                });
                            if (a.length >= 1)
                                a = a.substr(0, a.length - 1);
                            return a;
                        }() +
                        '&tags=' + function () {
                            var a = '';
                            if (tags instanceof Array)
                                tags.forEach(function (item) {
                                    a += item + '|';
                                });
                            if (a.length >= 1)
                                a = a.substr(0, a.length - 1);
                            return a;
                        }() +
                        '&title=' + function () {
                            var a = '';
                            if (title instanceof Array)
                                title.forEach(function (item) {
                                    a += item + '|';
                                });
                            if (a.length >= 1)
                                a = a.substr(0, a.length - 1);
                            return a;
                        }()
                        ).then(function success(res) {
                    console.log(res);

                    var ret = [];
                    res.data.forEach(function (item) {
                        ret.push(new Questionnaire(item.author, item._id, item.questions, item.tags, item.title));
                    });

                    next(ret);
                }, function error(res) {
                    console.log(res);
                    err(res);
                });
            };
            this.getByID = function (id, next, err) {
                $http.get(Configuration.remote + 'api/questionnaires/' + id).then(function success(res) {
                    console.log(res);
                    next(new Questionnaire(res.data.author, res.data._id, res.data.questions, res.data.tags, res.data.title));
                }, function error(res) {
                    console.log(res);
                    err(res);
                });
            };
            this.modify = function (questionnaire, next, err) {
                $http.put(Configuration.remote + 'api/questionnaires/' + questionnaire.id, {
                    'author': questionnaire.author,
                    'questions': questionnaire.questions,
                    'tags': questionnaire.tags,
                    'title': questionnaire.title
                }).then(function success(res) {
                    console.log(res);
                    next();
                }, function error(res) {
                    console.log(res);
                    err(res);
                });
            };
            this.new = function (questionnaire, next, err) {
                $http.post(Configuration.remote + 'api/questionnaires', {
                    'author': questionnaire.author,
                    'questions': questionnaire.questions,
                    'tags': questionnaire.tags,
                    'title': questionnaire.title
                }).then(function success(res) {
                    console.log(res);
                    next();
                }, function error(res) {
                    console.log(res);
                    err(res);
                });
            };
        }]);
});