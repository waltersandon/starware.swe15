$(function () {
    angular.module('CheckModule', ['ErrorModule', 'UserServiceModule', 'QuestionnaireServiceModule']).service('util.Check', ['model.data.Error', 'model.service.QuestionnaireService', function (Error, QuestionnaireService) {
            this.checkFullName = function (userName) {
                return userName.length >= 2 ? new Error() : new Error('Il <strong>nome completo</strong> deve avere almeno <strong>6</strong> caratteri', 'errorFullName', true, 'alert-warning');
            };
            this.checkPassword = function (password) {
                return password.length >= 6 ? new Error() : new Error('La <strong>password</strong> deve avere almeno <strong>6</strong> caratteri', 'errorPassword', true, 'alert-warning');
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
                }, function (res) {
                    err(res);
                });
            };
            this.checkUserName = function (userName) {
                return userName.length >= 6 ? new Error() : new Error('<strong>L\'username</strong> deve avere almeno <strong>6</strong> caratteri', 'errorUserName', true, 'alert-warning');
            };
        }]);
});