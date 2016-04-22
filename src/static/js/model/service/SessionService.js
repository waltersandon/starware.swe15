
angular.module('SessionService', []).service('SessionService', ['$http', function ($http) {
        this.login = function (password, userName) {
            $http.post('/session', {
                'password': password,
                'userName': userName
            }).then(function success(response) {
                console.log(response);
                return true;
            }, function error(response) {
                console.log(response);
                return false;
            });
        };
        this.logout = function () {
            $http.delete('/session').then(function success(response) {
                console.log(response);
                return true;
            }, function error(response) {
                console.log(response);
                return false;
            });
        };
    }]);
