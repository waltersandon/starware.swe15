$(function () {
    angular.module('UserServiceModule', ['CurrentUserModule', 'ConfigurationModule', 'UserModule']).service('model.service.UserService', ['app.Configuration', 'model.data.CurrentUser', '$http', 'model.data.User', function (Configuration, CurrentUser, $http, User) {
            this.delete = function (user) {
                var ret;

                $http.delete(Configuration.remote + 'api/users/' + user.id).then(function success(res) {
                    ret = true;
                }, function error(res) {
                    console.log(res);
                    ret = false;
                });

                return ret;
            };
            this.get = function (fullName, userName) {
                var ret = [];

                $http.get(Configuration.remote + 'api/users', {
                    'fullName': fullName,
                    'userName': userName
                }).then(function success(res) {
                    res.forEach(function (item) {
                        ret.push(new User(item.fullName, item._id, item.role, item.userName));
                    });
                }, function error(res) {
                    console.log(res);
                    ret = res;
                });

                return ret;
            };
            this.getByID = function (id) {
                var ret;

                $http.get(Configuration.remote + 'api/users/' + id).then(function success(res) {
                    ret = new User(res.fullName, res._id, res.role, res.userName);
                }, function error(res) {
                    console.log(res);
                    ret = res;
                });

                return ret;
            };
            this.getMe = function () {
                var ret;

                $http.get(Configuration.remote + 'api/users/me').then(function success(res) {
                    ret = new CurrentUser(new User(res.fullName, res._id, res.role, res.userName));
                }, function error(res) {
                    console.log(res);
                    ret = res;
                });

                return ret;
            };
            this.modifyRole = function (user, role) {
                var ret;

                $http.post(Configuration.remote + 'api/users/' + user.id, {
                    'role': {
                        'id': role.id
                    }
                }).then(function success(res) {
                    ret = true;
                }, function error(res) {
                    console.log(res);
                    ret = false;
                });

                return ret;
            };
            this.signUp = function (fullName, password, userName) {
                var ret;

                $http.post(Configuration.remote + 'api/users', {
                    'fullName': fullName,
                    'userName': userName,
                    'password': password
                }).then(function success(res) {
                    ret = true;
                }, function error(res) {
                    console.log(res);
                    ret = false;
                });

                return ret;
            };
            this.updateInformation = function (fullName, userName) {
                var ret;

                $http.post(Configuration.remote + 'api/users/me', {
                    'fullName': fullName,
                    'userName': userName
                }).then(function success(res) {
                    ret = true;
                }, function error(res) {
                    console.log(res);
                    ret = false;
                });

                return ret;
            };
            this.updatePassword = function (newPassword, oldPassword) {
                var ret;

                $http.post(Configuration.remote + 'api/users/me', {
                    'newPassword': newPassword,
                    'oldPassword': oldPassword
                }).then(function success(res) {
                    ret = true;
                }, function error(res) {
                    console.log(res);
                    ret = false;
                });

                return ret;
            };
        }]);
});