 
angular.module('UserModule', []).factory('User', function() {
    function User(fullName, id, role, userName) {
        this.fullName = fullName;
        this.id = id;
        this.role = role;
        this.userName = userName;
    }
    return User;
});
