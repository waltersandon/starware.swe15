$(function () {
    angular.module('CheckModule', ['UserServiceModule', 'QuestionnaireServiceModule']).service('util.Check', ['model.service.UserService', 'model.service.QuestionnaireService', function (UserService, QuestionnaireService) {
            this.checkPassword = function (password) {
                return password.length >= 6;
            };
            this.checkTitle = function (title, next, err) {
                QuestionnaireService.get(null, null, title, function (questionnaires) {
                    var ret = false;
                    questionnaires.forEach(function (item) {
                        if (item.title === title) {
                            ret = true;
                        }
                    });
                    next(ret);
                }, function () {
                    err();
                });
            };
            /*this.checkUserName = function (userName, next, err) {
                UserService.get(null, userName, function (users) {
                    var ret = false;
                    users.forEach(function (item) {
                        if (item.userName === userName) {
                            ret = true;
                        }
                    });
                    next(ret);
                }, function () {
                    err();
                });
            };*/
        }]);
});