$(function () {
    angular.module('ErrorModule', []).factory('model.data.Error', function () {
        function Error(message, status, type) {
            this.message = message || '';
            this.status = status || false;
            this.type = type || '';
        }
        return Error;
    });
});
