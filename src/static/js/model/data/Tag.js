$(function () {
    angular.module('TagModule', []).factory('model.data.Tag', function () {
        function Tag(description, id, name) {
            this.description = description;
            this.id = id;
            this.name = name;
        }
        return Tag;
    });
});