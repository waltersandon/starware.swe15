$(function () {
    angular.module('QuestionnaireServiceModule', ['ConfigurationModule', 'QuestionnaireModule']).service('model.service.QuestionnaireService', ['app.Configuration', '$http', 'model.data.Questionnaire', function (Configuration, $http, Questionnaire) {
            this.delete = function (questionnaire, next, err) {
                $http.delete(Configuration.remote + 'api/questionnaires/' + questionnaire.id).then(function success(res) {
                    console.log(res);
                    next();
                }, function error(res) {
                    console.log(res);
                    err();
                });
            };
            this.get = function (author, tags, title, next, err) {
                $http.get(Configuration.remote + 'api/questionnaires', {
                    'author': author,
                    'tags': tags,
                    'title': title
                }).then(function success(res) {
                    console.log(res);

                    var ret = [];
                    res.forEach(function (item) {
                        ret.push(new Questionnaire(item.author, item._id, item.questions, item.tags, item.title));
                    });
                    
                    next(ret);
                }, function error(res) {
                    console.log(res);
                    err();
                });
            };
            this.getByID = function (id, next, err) {
                $http.get(Configuration.remote + 'api/questionnaires/' + id).then(function success(res) {
                    console.log(res);
                    next(new Questionnaire(res.author, res._id, res.questions, res.tags, res.title));
                }, function error(res) {
                    console.log(res);
                    err();
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
                    err();
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
                    err();
                });
            };
        }]);
});