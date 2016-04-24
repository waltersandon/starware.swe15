$(function () {
    angular.module('CheckModule', ['UserServiceModule', 'QuestionnaireServiceModule']).service('model.util.Check', ['model.service.UserService', 'model.service.QuestionnaireService', function (UserService, QuestionnaireService) {
            this.checkPassword = function (password) {
                return password.length >= 6;
            };
            this.checkTitle = function (title) {
                return QuestionnaireService.get(null, null, title).length === 0;
            };
            this.checkUserName = function (userName) {
                return UserService.get(null, userName).length === 0;
            };
        }]);
});