$(function () {
    angular.module('CurrentUserModule', ['RoleServiceModule']).factory('model.data.CurrentUser', ['model.service.RoleService', function (RoleService) {
            function CurrentUser(user, role) {
                this.fullName = user.fullName;
                this.id = user.id;
                this.role = role;
                this.userName = user.userName;
            }
            return CurrentUser;
        }]);
});