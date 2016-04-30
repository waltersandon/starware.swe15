$(function () {
    angular.module('ErrorModule', []).factory('model.data.Error', function () {
        function Error(message, name, status, type) {
            this.message = message || '';
            this.name = name || '';
            this.status = status || false;
            this.type = type || '';
        }
        return Error;
    });
});
