$(function () {
    angular.module('UserModule', []).factory('model.data.User', function () {
        function User(fullName, id, role, userName) {
            this.fullName = fullName;
            this.id = id;
            this.role = role;
            this.userName = userName;
        }
        return User;
    });
});