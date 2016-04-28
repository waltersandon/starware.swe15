$(function () {
    angular.module('UserServiceModule', ['CurrentUserModule', 'ConfigurationModule', 'RoleServiceModule', 'UserModule']).service('model.service.UserService', ['app.Configuration', 'model.data.CurrentUser', '$http', 'model.service.RoleService', 'model.data.User', function (Configuration, CurrentUser, $http, RoleService, User) {
            this.delete = function (user, next, err) {
                $http.delete(Configuration.remote + 'api/users/' + user.id).then(function success(res) {
                    console.log(res);
                    next();
                }, function error(res) {
                    console.log(res);
                    err();
                });
            };
            this.get = function (fullName, userName, next, err) {
                $http.get(Configuration.remote + 'api/users', {
                    'fullName': fullName,
                    'userName': userName
                }).then(function success(res) {
                    console.log(res);

                    var ret = [];
                    res.data.forEach(function (item) {
                        ret.push(new User(item.fullName, item._id, item.role, item.userName));
                    });

                    next(ret);
                }, function error(res) {
                    console.log(res);
                    err();
                });
            };
            this.getByID = function (id, next, err) {
                $http.get(Configuration.remote + 'api/users/' + id).then(function success(res) {
                    console.log(res);
                    next(new User(res.data.fullName, res.data._id, res.data.role, res.data.userName));
                }, function error(res) {
                    console.log(res);
                    err();
                });
            };
            this.getMe = function (next, err) {
                $http.get(Configuration.remote + 'api/users/me').then(function success(res) {
                    console.log(res);
                    RoleService.get(res.data.role.href, function (role) {
                        next(new CurrentUser(new User(res.data.fullName, res.data._id, res.data.role, res.data.userName), role));
                    }, function () {
                        err();
                    });
                }, function error(res) {
                    console.log(res);
                    err();
                });
            };
            this.modifyRole = function (user, role, next, err) {
                $http.post(Configuration.remote + 'api/users/' + user.id, {
                    'role': {
                        'id': role.id
                    }
                }).then(function success(res) {
                    console.log(res);
                    next();
                }, function error(res) {
                    console.log(res);
                    err();
                });
            };
            this.signUp = function (fullName, password, userName, next, err) {
                $http.post(Configuration.remote + 'api/users', {
                    'fullName': fullName,
                    'userName': userName,
                    'password': password
                }).then(function success(res) {
                    console.log(res);
                    next();
                }, function error(res) {
                    console.log(res);
                    err();
                });
            };
            this.updateInformation = function (fullName, userName, next, err) {
                $http.post(Configuration.remote + 'api/users/me', {
                    'fullName': fullName,
                    'userName': userName
                }).then(function success(res) {
                    console.log(res);
                    next();
                }, function error(res) {
                    console.log(res);
                    err();
                });
            };
            this.updatePassword = function (newPassword, oldPassword, next, err) {
                $http.post(Configuration.remote + 'api/users/me', {
                    'newPassword': newPassword,
                    'oldPassword': oldPassword
                }).then(function success(res) {
                    console.log(res);
                    next();
                }, function error(res) {
                    console.log(res);
                    err();
                });
            };
        }]);
});