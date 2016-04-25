$(function () {
    angular.module('RoleModule', []).factory('model.data.Role', function () {
        function Role(id, name) {
            this.id = id;
            this.name = name;
        }
        return Role;
    });
});