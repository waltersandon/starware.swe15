$(function () {
    angular.module('TagModule', []).factory('model.data.Tag', function () {
        function Tag(description, id, name, parent) {
            this.description = description;
            this.id = id;
            this.name = name;
            this.parent = parent;
        }
        return Tag;
    });
});