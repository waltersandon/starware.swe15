$(function () {
    angular.module('UserServiceModule', ['CurrentUserModule', 'ConfigurationModule', 'RoleServiceModule', 'UserModule']).service('model.service.UserService', ['app.Configuration', 'model.data.CurrentUser', '$http', 'model.service.RoleService', 'model.data.User', function (Configuration, CurrentUser, $http, RoleService, User) {
            this.delete = function (user, next, err) {
                $http.delete(Configuration.remote + 'api/users/' + user._id).then(function success(res) {
                    console.log(res);
                    next();
                }, function error(res) {
                    console.log(res);
                    err(res);
                });
            };
            this.get = function (fullName, userName, next, err) {
                $http.get(Configuration.remote + 'api/users?' +
                        'fullName=' + function () {
                            var a = '';
                            if (fullName instanceof Array)
                                fullName.forEach(function (item) {
                                    a += item + '|';
                                });
                            if (a.length >= 1)
                                a = a.substr(0, a.length - 1);
                            return a;
                        }() +
                        '&userName=' + function () {
                            var a = '';
                            if (userName instanceof Array)
                                userName.forEach(function (item) {
                                    a += item + '|';
                                });
                            if (a.length >= 1)
                                a = a.substr(0, a.length - 1);
                            return a;
                        }()
                        ).then(function success(res) {
                    console.log(res);

                    var ret = [];
                    res.data.forEach(function (item) {
                        ret.push(new User(item.fullName, item._id, item.role, item.userName));
                    });

                    next(ret);
                }, function error(res) {
                    console.log(res);
                    err(res);
                });
            };
            this.getByID = function (id, next, err) {
                $http.get(Configuration.remote + 'api/users/' + id).then(function success(res) {
                    console.log(res);
                    next(new User(res.data.fullName, res.data._id, res.data.role, res.data.userName));
                }, function error(res) {
                    console.log(res);
                    err(res);
                });
            };
            this.getMe = function (next, err) {
                $http.get(Configuration.remote + 'api/users/me').then(function success(res) {
                    console.log(res);
                    RoleService.getByID(res.data.role, function (role) {
                        next(new CurrentUser(new User(res.data.fullName, res.data._id, res.data.role, res.data.userName), role));
                    }, function (res) {
                        err(res);
                    });
                }, function error(res) {
                    console.log(res);
                    err(res);
                });
            };
            this.modifyRole = function (user, role, next, err) {
                $http.post(Configuration.remote + 'api/users/' + user._id, {
                    role: role._id
                }).then(function success(res) {
                    console.log(res);
                    next();
                }, function error(res) {
                    console.log(res);
                    err(res);
                });
            };
            this.signUp = function (fullName, password, userName, next, err) {
                $http.post(Configuration.remote + 'api/users', {
                    fullName: fullName,
                    userName: userName,
                    password: password
                }).then(function success(res) {
                    console.log(res);
                    next();
                }, function error(res) {
                    console.log(res);
                    err(res);
                });
            };
            this.updateInformation = function (fullName, userName, next, err) {
                $http.post(Configuration.remote + 'api/users/me', {
                    'fullName': fullName,
                    'userName': userName
                }).then(function success(res) {
                    console.log(res);
                    next(res.data);
                }, function error(res) {
                    console.log(res);
                    err(res);
                });
            };
            this.updatePassword = function (newPassword, oldPassword, next, err) {
                $http.post(Configuration.remote + 'api/users/me', {
                    'newPassword': newPassword,
                    'oldPassword': oldPassword
                }).then(function success(res) {
                    console.log(res);
                    next(res.data);
                }, function error(res) {
                    console.log(res);
                    err(res);
                });
            };
        }]);
});