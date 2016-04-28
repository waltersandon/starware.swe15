$(function () {
    angular.module('CurrentUserModule', ['RoleServiceModule']).factory('model.data.CurrentUser', ['model.service.RoleService', function (RoleService) {
        function CurrentUser(user) {
            this.fullName = user.fullName;
            this.id = user.id;
            this.role = RoleService.get(user.role.href);
            this.userName = user.userName;
        }
        return CurrentUser;
    }]);
});