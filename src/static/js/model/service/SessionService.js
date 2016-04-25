$(function () {
    angular.module('SessionServiceModule', []).service('model.service.SessionService', ['$http', function ($http) {
            this.login = function (password, userName) {
                var ret;
                
                $http.post('api/session', {
                    'password': password,
                    'userName': userName
                }).then(function success(res) {
                    console.log(res);
                    ret = true;
                }, function error(res) {
                    console.log(res);
                    ret = false;
                });
                
                return ret;
            };
            this.logout = function () {
                var ret;
                
                $http.delete('api/session').then(function success(res) {
                    ret = true;
                }, function error(res) {
                    console.log(res);
                    ret = false;
                });
                
                return ret;
            };
        }]);
});