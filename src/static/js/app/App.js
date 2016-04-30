$(function () {
    $.material.init();

    angular.module('app.App', ['ngCookies', 'ngSanitize', 'CheckModule', 'ErrorModule', 'SessionServiceModule', 'UserServiceModule']);
});
