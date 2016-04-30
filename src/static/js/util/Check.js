$(function () {
    angular.module('CheckModule', ['ErrorModule', 'UserServiceModule', 'QuestionnaireServiceModule']).service('util.Check', ['model.data.Error', 'model.service.QuestionnaireService', function (Error, QuestionnaireService) {
            this.checkPassword = function (password) {
                return password.length >= 6 ? new Error() : new Error('La password deve avere almeno <strong>6</strong> caratteri', 'errorPassword', true, 'alert-warning');
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
                return userName.length >= 6 ? new Error() : new Error('L\'username deve avere almeno <strong>6</strong> caratteri', 'errorUserName', true, 'alert-warning');
            };
        }]);
});