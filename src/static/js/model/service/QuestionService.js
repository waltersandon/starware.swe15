$(function () {
    angular.module('QuestionServiceModule', ['ConfigurationModule', 'QuestionModule']).service('model.service.QuestionService', ['app.Configuration', '$http', 'model.data.Question', function (Configuration, $http, Question) {
            this.delete = function (question, next, err) {
                $http.delete(Configuration.remote + 'api/questions/' + question.id).then(function success(res) {
                    console.log(res);
                    next();
                }, function error(res) {
                    console.log(res);
                    err(res);
                });
            };
            this.get = function (author, keywords, tags, next, err) {
                $http.get(Configuration.remote + 'api/questions?' +
                        'author=' + function () {
                            var a = '';
                            if (author instanceof Array)
                                author.forEach(function (item) {
                                    a += item + '|';
                                });
                            if (a.length >= 2)
                                a.substr(0, a.length - 2);
                            return a;
                        }() +
                        '&keywords=' + function () {
                            var a = '';
                            if (keywords instanceof Array)
                                keywords.forEach(function (item) {
                                    a += item + '|';
                                });
                            if (a.length >= 2)
                                a.substr(0, a.length - 2);
                            return a;
                        }() +
                        '&tags=' + function () {
                            var a = '';
                            if (tags instanceof Array)
                                tags.forEach(function (item) {
                                    a += item + '|';
                                });
                            if (a.length >= 2)
                                a.substr(0, a.length - 2);
                            return a;
                        }()
                        ).then(function success(res) {
                    console.log(res);

                    var ret = [];
                    res.data.forEach(function (item) {
                        ret.push(new Question(item.author, item.body, item._id, item.tags));
                    });

                    next(ret);
                }, function error(res) {
                    console.log(res);
                    err(res);
                });
            };
            this.getByID = function (id, next, err) {
                $http.get(Configuration.remote + 'api/questions/' + id).then(function success(res) {
                    console.log(res);
                    next(new Question(res.data.author, res.data.body, res.data._id, res.data.tags));
                }, function error(res) {
                    console.log(res);
                    err(res);
                });
            };
            this.modify = function (question, next, err) {
                $http.put(Configuration.remote + 'api/questions/' + question.id, {
                    'author': question.author,
                    'body': question.body,
                    'tags': question.tags
                }).then(function success(res) {
                    console.log(res);
                    next();
                }, function error(res) {
                    console.log(res);
                    err(res);
                });
            };
            this.new = function (question, next, err) {
                $http.post(Configuration.remote + 'api/questionnaires', {
                    'author': question.author,
                    'body': question.body,
                    'tags': question.tags
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