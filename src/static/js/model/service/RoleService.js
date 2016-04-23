
angular.module('RoleServiceModule', ['RoleModule']).service('RoleService', ['$http', 'Role', function ($http, Role) {
        this.delete = function (role) {
            $http.delete('/roles/' + role.id).then(function success(res) {
                return true;
            }, function error(res) {
                return false;
            });
        };
        this.get = function (keywords) {
            $http.get('/roles', {
                'keywords': keywords
            }).then(function success(res) {
                var a = [];
                res.forEach(function (item) {
                    a.push(new Role(item.id, item.name));
                });
                return a;
            }, function error(res) {
                return res;
            });
        };
        this.getByID = function (id) {
            $http.get('/roles/' + id).then(function success(res) {
                return new Role(res.id, res.name);
            }, function error(res) {
                return res;
            });
        };
        this.modify = function (role) {
            $http.put('/roles/' + role.id, {
                'name': role.name
            }).then(function success(res) {
                return true;
            }, function error(res) {
                return false;
            });
        };
        this.new = function (role) {
            $http.post('/roles', {
                'name': role.name
            }).then(function success(res) {
                return true;
            }, function error(res) {
                return false;
            });
        };
    }]);
