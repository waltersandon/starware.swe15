$(function () {
    angular.module('SessionServiceModule', ['ConfigurationModule']).service('model.service.SessionService', ['app.Configuration', '$http', function (Configuration, $http) {
            this.login = function (password, userName, next, err) {
                $http.post(Configuration.remote + 'api/session', {
                    'password': password,
                    'userName': userName
                }).then(function success(res) {
                    next();
                }, function error(res) {
                    err(res);
                });
            };
            this.logout = function (next, err) {
                $http.delete(Configuration.remote + 'api/session').then(function success(res) {
                    next();
                }, function error(res) {
                    err(res);
                });
            };
        }]);
});