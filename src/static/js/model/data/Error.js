$(function () {
    angular.module('ErrorModule', []).factory('model.data.Error', function () {
        function Error(message, name, status, type) {
            this.message = typeof message !== 'undefined' ? message : '';
            this.name = typeof name !== 'undefined' ? name : '';
            this.status = typeof status !== 'undefined' ? status : false;
            this.type = typeof type !== 'undefined' ? type : '';
        }
        return Error;
    });
});
