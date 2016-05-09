$(function () {
    angular.module('UtilModule', []).service('util.Util', [function () {
            this.alert = function (message) {
                alert(message);
            };
            this.confirm = function (message) {
                return confirm(message);
            };
        }]);
});