
angular.module('UserServiceModule', ['UserModule']).service('UserService', ['$http', 'User', function ($http, User) {
        this.delete = function (user) {
            $http.delete('/users/' + user.id).then(function success(res) {
                return true;
            }, function error(res) {
                return false;
            });
        };
        this.get = function (fullName, userName) {
            $http.get('/users', {
                'fullName': fullName,
                'userName': userName
            }).then(function success(res) {
                var a = [];
                res.forEach(function (item) {
                    a.push(new User(item.id, item.fullName, item.role, item.userName));
                });
                return a;
            }, function error(res) {
                return res;
            });
        };
        this.getByID = function (id) {
            $http.get('/users/' + id).then(function success(res) {
                return new User(res.id, res.fullName, res.role, res.userName);
            }, function error(res) {
                return res;
            });
        };
        this.getMe = function () {
            $http.get('/users/me').then(function success(res) {
                return new User(res.id, res.fullName, res.role, res.userName);
            }, function error(res) {
                return res;
            });
        };
        this.modifyRole = function (user, role) {
            $http.post('/users/' + user.id, {
                'role': {
                    'id': role.id
                }
            }).then(function success(res) {
                return true;
            }, function error(res) {
                return false;
            });
        };
        this.signUp = function (fullName, password, userName) {
            $http.post('/users', {
                'fullName': fullName,
                'userName': userName,
                'password': password
            }).then(function success(res) {
                return true;
            }, function error(res) {
                return false;
            });
        };
        this.updateInformation = function (fullName, userName) {
            $http.post('/users/me', {
                'fullName': fullName,
                'userName': userName
            }).then(function success(res) {
                return true;
            }, function error(res) {
                return false;
            });
        };
        this.updatePassword = function (newPassword, oldPassword) {
            $http.post('/users/me', {
                'newPassword': newPassword,
                'oldPassword': oldPassword
            }).then(function success(res) {
                return true;
            }, function error(res) {
                return false;
            });
        };
    }]);


