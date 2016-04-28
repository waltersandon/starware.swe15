$(function () {
    angular.module('QuestionServiceModule', ['ConfigurationModule', 'QuestionModule']).service('model.service.QuestionService', ['app.Configuration', '$http', 'model.data.Question', function (Configuration, $http, Question) {
            this.delete = function (question, next, err) {
                $http.delete(Configuration.remote + 'api/questions/' + question.id).then(function success(res) {
                    console.log(res);
                    next();
                }, function error(res) {
                    console.log(res);
                    err();
                });
            };
            this.get = function (author, keywords, tags, next, err) {
                $http.get(Configuration.remote + 'api/questions', {
                    'author': author,
                    'keywords': keywords,
                    'tags': tags
                }).then(function success(res) {
                    console.log(res);
                    
                    var ret = [];
                    res.data.forEach(function (item) {
                        ret.push(new Question(item.author, item.body, item._id, item.tags));
                    });
                    
                    next(ret);
                }, function error(res) {
                    console.log(res);
                    err();
                });
            };
            this.getByID = function (id, next, err) {
                $http.get(Configuration.remote + 'api/questions/' + id).then(function success(res) {
                    console.log(res);
                    next(new Question(res.data.author, res.data.body, res.data._id, res.data.tags));
                }, function error(res) {
                    console.log(res);
                    err();
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
                    err();
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
                    err();
                });
            };
        }]);
});