$(function () {
    angular.module('UtilModule', []).service('util.Check', [function () {
            this.confirm = function (message) {
                return confirm(message);
            };
            this.alert = function (message) {
                alert(message);
            };
        }]);
});