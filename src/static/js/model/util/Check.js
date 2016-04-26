$(function () {
    angular.module('CheckModule', ['UserServiceModule', 'QuestionnaireServiceModule']).service('model.util.Check', ['model.service.UserService', 'model.service.QuestionnaireService', function (UserService, QuestionnaireService) {
            this.checkPassword = function (password) {
                return password.length >= 6;
            };
            this.checkTitle = function (title) {
                var ret = false;
                var a = QuestionnaireService.get(null, null, title);
                
                a.forEach(function (item) {
                    if (item.title === title) {
                        ret = true;
                    }
                });
                
                return ret;
            };
            this.checkUserName = function (userName) {
                var ret = false;
                var a = UserService.get(null, userName);
                
                a.forEach(function (item) {
                    if (item.userName === userName) {
                        ret = true;
                    }
                });
                
                return ret;
            };
        }]);
});