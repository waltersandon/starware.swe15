$(function () {
    $.material.init();

    angular.module('app.App', ['ngCookies', 'ngSanitize', 'CheckModule', 'EditorModule', 'ErrorModule', 'QMLModule', 'QuestionnaireServiceModule', 'QuestionServiceModule', 'RoleServiceModule', 'SessionServiceModule', 'TagServiceModule', 'UserServiceModule', 'CurrentQuestionnaireModule', 'CurrentQuestionModule', 'UtilModule']);

});