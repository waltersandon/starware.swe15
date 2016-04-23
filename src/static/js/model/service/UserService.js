$(function () {
    angular.module('UserServiceModule', ['UserModule']).service('UserService', ['$http', 'User', function ($http, User) {
            this.delete = function (user) {
                var ret;

                $http.delete('api/users/' + user.id).then(function success(res) {
                    ret = true;
                }, function error(res) {
                    console.log(res.error);
                    ret = false;
                });

                return ret;
            };
            this.get = function (fullName, userName) {
                var ret = [];

                $http.get('api/users', {
                    'fullName': fullName,
                    'userName': userName
                }).then(function success(res) {
                    res.forEach(function (item) {
                        ret.push(new User(item.fullName, item.id, item.role, item.userName));
                    });
                }, function error(res) {
                    console.log(res.error);
                    ret = res;
                });

                return ret;
            };
            this.getByID = function (id) {
                var ret;

                $http.get('api/users/' + id).then(function success(res) {
                    ret = new User(res.fullName, res.id, res.role, res.userName);
                }, function error(res) {
                    console.log(res.error);
                    ret = res;
                });

                return ret;
            };
            this.getMe = function () {
                var ret;

                $http.get('api/users/me').then(function success(res) {
                    ret = new User(res.fullName, res.id, res.role, res.userName);
                }, function error(res) {
                    console.log(res.error);
                    ret = res;
                });

                return ret;
            };
            this.modifyRole = function (user, role) {
                var ret;

                $http.post('api/users/' + user.id, {
                    'role': {
                        'id': role.id
                    }
                }).then(function success(res) {
                    ret = true;
                }, function error(res) {
                    console.log(res.error);
                    ret = false;
                });

                return ret;
            };
            this.signUp = function (fullName, password, userName) {
                var ret;

                $http.post('api/users', {
                    'fullName': fullName,
                    'userName': userName,
                    'password': password
                }).then(function success(res) {
                    ret = true;
                }, function error(res) {
                    console.log(res.error);
                    ret = false;
                });

                return ret;
            };
            this.updateInformation = function (fullName, userName) {
                var ret;

                $http.post('api/users/me', {
                    'fullName': fullName,
                    'userName': userName
                }).then(function success(res) {
                    ret = true;
                }, function error(res) {
                    console.log(res.error);
                    ret = false;
                });

                return ret;
            };
            this.updatePassword = function (newPassword, oldPassword) {
                var ret;

                $http.post('api/users/me', {
                    'newPassword': newPassword,
                    'oldPassword': oldPassword
                }).then(function success(res) {
                    ret = true;
                }, function error(res) {
                    console.log(res.error);
                    ret = false;
                });

                return ret;
            };
        }]);
});