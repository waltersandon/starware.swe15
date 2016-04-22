 
angular.module('Role', []).factory('Role', function() {
    function Role(name) {
        this.name = name;
    }
    return Role;
});
