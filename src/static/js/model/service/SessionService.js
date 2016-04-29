$(function () {
    angular.module('SessionServiceModule', ['ConfigurationModule']).service('model.service.SessionService', ['app.Configuration', '$http', function (Configuration, $http) {
            this.login = function (password, userName, next, err) {
                $http.post(Configuration.remote + 'api/session', {
                    'password': password,
                    'userName': userName
                }).then(function success(res) {
                    console.log(res);
                    next();
                }, function error(res) {
                    console.log(res);
                    err();
                });
            };
            this.logout = function (next, err) {
                $http.delete(Configuration.remote + 'api/session').then(function success(res) {
                    console.log(res);
                    next();
                }, function error(res) {
                    console.log(res);
                    err();
                });
            };
        }]);
});