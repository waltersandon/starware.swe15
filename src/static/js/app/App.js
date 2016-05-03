$(function () {
    $.material.init();

    angular.module('app.App', ['ngCookies', 'ngSanitize', 'CheckModule', 'ErrorModule', 'QuestionnaireServiceModule', 'QuestionServiceModule', 'RoleServiceModule', 'SessionServiceModule', 'TagServiceModule', 'UserServiceModule', 'CurrentQuestionnaireModule', 'CurrentQuestionModule']);

});



