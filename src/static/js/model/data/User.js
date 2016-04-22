 
angular.module('UserFactory', []).factory('User', function() {
    function User(id, fullName, role, userName) {
        this.id = id;
        this.fullName = fullName;
        this.role = role;
        this.userName = userName;
    }
    return User;
});
