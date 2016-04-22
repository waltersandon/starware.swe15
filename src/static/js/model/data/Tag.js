 
angular.module('Tag', []).factory('Tag', function() {
    function Tag(description, name, parent) {
        this.description = description;
        this.name = name;
        this.parent = parent;
    }
    return Tag;
});
