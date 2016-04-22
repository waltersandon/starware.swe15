
angular.module('QuestionnaireServiceModule', ['QuestionnaireModule']).service('QuestionnaireService', ['$http', 'Questionnaire', function ($http, Questionnaire) {
        this.delete = function (questionnaire) {
            $http.delete('/questionnaires/' + questionnaire.id).then(function success(res) {
                return true;
            }, function error(res) {
                return false;
            });
        };
        this.get = function (author, tags, title) {
            $http.get('/questionnaires', {
                'author': author,
                'tags': tags,
                'title': title
            }).then(function success(res) {
                var a = [];
                res.forEach(function (item) {
                    a.push(new Questionnaire(item.author, item.id, item.questions, item.tags, item.title));
                });
                return a;
            }, function error(res) {
                return res;
            });
        };
        this.getByID = function (id) {
            $http.get('/questionnaires/' + id).then(function success(res) {
                return new Questionnaire(res.author, res.id, res.questions, res.tags, res.title);
            }, function error(res) {
                return res;
            });
        };
        this.modify = function (questionnaire) {
            $http.put('/questionnaires/' + questionnaire.id, {
                'author': questionnaire.author,
                'questions': questionnaire.questions,
                'tags': questionnaire.tags,
                'title': questionnaire.title
            }).then(function success(res) {
                return true;
            }, function error(res) {
                return false;
            });
        };
        this.new = function (questionnaire) {
            $http.post('/questionnaires', {
                'author': questionnaire.author,
                'questions': questionnaire.questions,
                'tags': questionnaire.tags,
                'title': questionnaire.title
            }).then(function success(res) {
                return true;
            }, function error(res) {
                return false;
            });
        };
    }]);
