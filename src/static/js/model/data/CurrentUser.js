$(function () {
    angular.module('CurrentUserModule', ['RoleServiceModule']).factory('model.data.CurrentUser', ['model.service.RoleService', function (RoleService) {
            function CurrentUser(user, role, password) {
                this.fullName = user.fullName;
                this.id = user._id;
                this.password = password;
                this.role = role;
                this.userName = user.userName;
            }
            return CurrentUser;
        }]);
});