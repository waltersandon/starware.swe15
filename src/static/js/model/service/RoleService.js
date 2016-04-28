$(function () {
    angular.module('RoleServiceModule', ['ConfigurationModule', 'RoleModule']).service('model.service.RoleService', ['app.Configuration', '$http', 'model.data.Role', function (Configuration, $http, Role) {
            /*this.delete = function (role) {
                var ret;

                $http.delete(Configuration.remote + 'api/roles/' + role.id).then(function success(res) {
                    ret = true;
                }, function error(res) {
                    console.log(res);
                    ret = false;
                });

                return ret;
            };*/
            this.get = function (keywords) {
                var ret = [];

                $http.get(Configuration.remote + 'api/roles', {
                    'keywords': keywords
                }).then(function success(res) {
                    res.forEach(function (item) {
                        ret.push(new Role(item._id, item.name));
                    });
                }, function error(res) {
                    console.log(res);
                    ret = res;
                });

                return ret;
            };
            this.getByID = function (id) {
                var ret;

                $http.get(Configuration.remote + 'api/roles/' + id).then(function success(res) {
                    ret = new Role(res._id, res.name);
                }, function error(res) {
                    console.log(res);
                    ret = res;
                });

                return ret;
            };
            /*this.modify = function (role) {
                var ret;

                $http.put(Configuration.remote + 'api/roles/' + role.id, {
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

                $http.post(Configuration.remote + 'api/roles', {
                    'name': role.name
                }).then(function success(res) {
                    ret = true;
                }, function error(res) {
                    console.log(res);
                    ret = false;
                });

                return ret;
            };*/
        }]);
});