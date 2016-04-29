$(function () {
    $.material.init();

    angular.module('app.App', ['ngCookies', 'CheckModule', 'SessionServiceModule', 'UserServiceModule']);
});
