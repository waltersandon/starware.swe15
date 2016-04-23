
angular.module('QuestionService', ['QuestionModule']).service('QuestionService', ['$http', 'Question', function ($http, Question) {
        this.delete = function (question) {
            $http.delete('/questions/' + question.id).then(function success(res) {
                return true;
            }, function error(res) {
                return false;
            });
        };
        this.get = function (author, keywords, tags) {
            $http.get('/questions', {
                'author': author,
                'keywords': keywords,
                'tags': tags
            }).then(function success(res) {
                var a = [];
                res.forEach(function (item) {
                    a.push(new Question(item.author, item.body, item.id, item.tags));
                });
                return a;
            }, function error(res) {
                return res;
            });
        };
        this.getByID = function (id) {
            $http.get('/questions/' + id).then(function success(res) {
                return new Question(res.author, res.body, res.id, res.tags);
            }, function error(res) {
                return res;
            });
        };
        this.modify = function (question) {
            $http.put('/questions/' + question.id, {
                'author': question.author,
                'body': question.body,
                'tags': question.tags
            }).then(function success(res) {
                return true;
            }, function error(res) {
                return false;
            });
        };
        this.new = function (question) {
            $http.post('/questionnaires', {
                'author': question.author,
                'body': question.body,
                'tags': question.tags
            }).then(function success(res) {
                return true;
            }, function error(res) {
                return false;
            });
        };
    }]);
