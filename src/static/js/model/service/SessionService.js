$(function () {
    angular.module('SessionServiceModule', ['ConfigurationModule']).service('model.service.SessionService', ['app.Configuration', '$http', function (Configuration, $http) {
            this.login = function (password, userName) {
                var ret;
                
                $http.post(Configuration.remote + 'api/session', {
                    'password': password,
                    'userName': userName
                }).then(function success(res) {
                    ret = true;
                }, function error(res) {
                    console.log(res);
                    ret = false;
                });
                
                return ret;
            };
            this.logout = function () {
                var ret;
                
                $http.delete(Configuration.remote + 'api/session').then(function success(res) {
                    ret = true;
                }, function error(res) {
                    console.log(res);
                    ret = false;
                });
                
                return ret;
            };
        }]);
});