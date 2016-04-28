$(function () {
    angular.module('RoleServiceModule', ['ConfigurationModule', 'RoleModule']).service('model.service.RoleService', ['app.Configuration', '$http', 'model.data.Role', function (Configuration, $http, Role) {
            this.get = function (keywords, next, err) {
                $http.get(Configuration.remote + 'api/roles', {
                    'keywords': keywords
                }).then(function success(res) {
                    console.log(res);
                    
                    var ret = [];
                    res.data.forEach(function (item) {
                        ret.push(new Role(item._id, item.name));
                    });
                    
                    next(ret);
                }, function error(res) {
                    console.log(res);
                    err();
                });
            };
            this.getByID = function (id, next, err) {
                $http.get(Configuration.remote + 'api/roles/' + id).then(function success(res) {
                    console.log(res);
                    next(new Role(res.data._id, res.data.name));
                }, function error(res) {
                    console.log(res);
                    err();
                });
            };
        }]);
});