
angular.module('SessionServiceModule', []).service('SessionService', ['$http', function ($http) {
        this.login = function (password, userName) {
            $http.post('/session', {
                'password': password,
                'userName': userName
            }).then(function success(res) {
                console.log(res);
                return true;
            }, function error(res) {
                console.log(res);
                return false;
            });
        };
        this.logout = function () {
            $http.delete('/session').then(function success(res) {
                console.log(res);
                return true;
            }, function error(res) {
                console.log(res);
                return false;
            });
        };
    }]);
