$(function () {
    angular.module('QuestionServiceModule', ['ConfigurationModule', 'QuestionModule']).service('model.service.QuestionService', ['app.Configuration', '$http', 'model.data.Question', function (Configuration, $http, Question) {
            this.delete = function (question) {
                var ret;

                $http.delete(Configuration.remote + 'api/questions/' + question.id).then(function success(res) {
                    ret = true;
                }, function error(res) {
                    console.log(res);
                    ret = false;
                });

                return ret;
            };
            this.get = function (author, keywords, tags) {
                var ret = [];

                $http.get(Configuration.remote + 'api/questions', {
                    'author': author,
                    'keywords': keywords,
                    'tags': tags
                }).then(function success(res) {
                    res.forEach(function (item) {
                        ret.push(new Question(item.author, item.body, item._id, item.tags));
                    });
                }, function error(res) {
                    console.log(res);
                    ret = res;
                });

                return ret;
            };
            this.getByID = function (id) {
                var ret;

                $http.get(Configuration.remote + 'api/questions/' + id).then(function success(res) {
                    ret = new Question(res.author, res.body, res._id, res.tags);
                }, function error(res) {
                    console.log(res);
                    ret = res;
                });

                return ret;
            };
            this.modify = function (question) {
                var ret;

                $http.put(Configuration.remote + 'api/questions/' + question.id, {
                    'author': question.author,
                    'body': question.body,
                    'tags': question.tags
                }).then(function success(res) {
                    ret = true;
                }, function error(res) {
                    console.log(res);
                    ret = false;
                });

                return ret;
            };
            this.new = function (question) {
                var ret;

                $http.post(Configuration.remote + 'api/questionnaires', {
                    'author': question.author,
                    'body': question.body,
                    'tags': question.tags
                }).then(function success(res) {
                    ret = true;
                }, function error(res) {
                    console.log(res);
                    ret = false;
                });

                return ret;
            };
        }]);
});