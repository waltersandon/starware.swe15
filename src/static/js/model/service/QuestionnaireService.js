$(function () {
    angular.module('QuestionnaireServiceModule', ['ConfigurationModule', 'QuestionnaireModule']).service('model.service.QuestionnaireService', ['app.Configuration', '$http', 'model.data.Questionnaire', function (Configuration, $http, Questionnaire) {
            this.delete = function (questionnaire) {
                var ret;

                $http.delete(Configuration.remote + 'api/questionnaires/' + questionnaire.id).then(function success(res) {
                    ret = true;
                }, function error(res) {
                    console.log(res);
                    ret = false;
                });

                return ret;
            };
            this.get = function (author, tags, title) {
                var ret = [];

                $http.get(Configuration.remote + 'api/questionnaires', {
                    'author': author,
                    'tags': tags,
                    'title': title
                }).then(function success(res) {
                    res.forEach(function (item) {
                        ret.push(new Questionnaire(item.author, item._id, item.questions, item.tags, item.title));
                    });
                }, function error(res) {
                    console.log(res);
                    ret = res;
                });

                return ret;
            };
            this.getByID = function (id) {
                var ret;

                $http.get(Configuration.remote + 'api/questionnaires/' + id).then(function success(res) {
                    ret = new Questionnaire(res.author, res._id, res.questions, res.tags, res.title);
                }, function error(res) {
                    console.log(res);
                    ret = res;
                });

                return ret;
            };
            this.modify = function (questionnaire) {
                var ret;

                $http.put(Configuration.remote + 'api/questionnaires/' + questionnaire.id, {
                    'author': questionnaire.author,
                    'questions': questionnaire.questions,
                    'tags': questionnaire.tags,
                    'title': questionnaire.title
                }).then(function success(res) {
                    ret = true;
                }, function error(res) {
                    console.log(res);
                    ret = false;
                });

                return ret;
            };
            this.new = function (questionnaire) {
                var ret;

                $http.post(Configuration.remote + 'api/questionnaires', {
                    'author': questionnaire.author,
                    'questions': questionnaire.questions,
                    'tags': questionnaire.tags,
                    'title': questionnaire.title
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