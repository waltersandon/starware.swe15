$(function () {
    angular.module('RoleServiceModule', ['RoleModule']).service('RoleService', ['$http', 'Role', function ($http, Role) {
            this.delete = function (role) {
                var ret;

                $http.delete('api/roles/' + role.id).then(function success(res) {
                    ret = true;
                }, function error(res) {
                    console.log(res);
                    ret = false;
                });

                return ret;
            };
            this.get = function (keywords) {
                var ret = [];

                $http.get('api/roles', {
                    'keywords': keywords
                }).then(function success(res) {
                    res.forEach(function (item) {
                        ret.push(new Role(item.id, item.name));
                    });
                }, function error(res) {
                    console.log(res);
                    ret = res;
                });

                return ret;
            };
            this.getByID = function (id) {
                var ret;

                $http.get('api/roles/' + id).then(function success(res) {
                    ret = new Role(res.id, res.name);
                }, function error(res) {
                    console.log(res);
                    ret = res;
                });

                return ret;
            };
            this.modify = function (role) {
                var ret;

                $http.put('api/roles/' + role.id, {
                    'name': role.name
                }).then(function success(res) {
                    ret = true;
                }, function error(res) {
                    console.log(res);
                    ret = false;
                });

                return ret;
            };
            this.new = function (role) {
                var ret;

                $http.post('api/roles', {
                    'name': role.name
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