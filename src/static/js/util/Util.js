$(function () {
    angular.module('UtilModule', []).service('util.Util', [function () {
            this.confirm = function (message) {
                return confirm(message);
            };
            this.alert = function (message) {
                alert(message);
            };
        }]);
});