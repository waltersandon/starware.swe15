$(function () {
    angular.module('AnswerServiceModule', ['ConfigurationModule']).service('model.service.AnswerService', ['app.Configuration', '$http', function (Configuration, $http) {
            this.get = function (questionnaire, question, next, err) {
                $http.get(Configuration.remote + 'api/answers?' +
                        'questionnaires=' + function () {
                            var a = '';
                            if (questionnaire instanceof Array)
                                questionnaire.forEach(function (item) {
                                    a += item + '|';
                                });
                            if (a.length >= 1)
                                a = a.substr(0, a.length - 1);
                            return a;
                        }() +
                        '&questions=' + function () {
                            var a = '';
                            if (question instanceof Array)
                                question.forEach(function (item) {
                                    a += item + '|';
                                });
                            if (a.length >= 1)
                                a = a.substr(0, a.length - 1);
                            return a;
                        }()
                        ).then(function success(res) {

                    var ret = [];
                    res.data.forEach(function (item) {
                        ret.push(item);
                    });

                    next(ret);
                }, function error(res) {
                    err(res);
                });
            };
            this.new = function (questionnaire, question, score, next, err) {
                $http.post(Configuration.remote + 'api/answers', {
                    'questionnaire': questionnaire.id,
                    'question': question.id,
                    'score': score
                }).then(function success(res) {
                    next(res.data);
                }, function error(res) {
                    err(res);
                });
            };
        }]);
});