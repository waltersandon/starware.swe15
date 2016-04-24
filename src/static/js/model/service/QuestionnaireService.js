$(function () {
    angular.module('QuestionnaireServiceModule', ['QuestionnaireModule']).service('model.service.QuestionnaireService', ['$http', 'model.data.Questionnaire', function ($http, Questionnaire) {
            this.delete = function (questionnaire) {
                var ret;

                $http.delete('api/questionnaires/' + questionnaire.id).then(function success(res) {
                    ret = true;
                }, function error(res) {
                    console.log(res);
                    ret = false;
                });

                return ret;
            };
            this.get = function (author, tags, title) {
                var ret = [];

                $http.get('api/questionnaires', {
                    'author': author,
                    'tags': tags,
                    'title': title
                }).then(function success(res) {
                    res.forEach(function (item) {
                        ret.push(new Questionnaire(item.author, item.id, item.questions, item.tags, item.title));
                    });
                }, function error(res) {
                    console.log(res);
                    ret = res;
                });

                return ret;
            };
            this.getByID = function (id) {
                var ret;

                $http.get('api/questionnaires/' + id).then(function success(res) {
                    ret = new Questionnaire(res.author, res.id, res.questions, res.tags, res.title);
                }, function error(res) {
                    console.log(res);
                    ret = res;
                });

                return ret;
            };
            this.modify = function (questionnaire) {
                var ret;

                $http.put('api/questionnaires/' + questionnaire.id, {
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

                $http.post('api/questionnaires', {
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