$(function () {
    $.material.init();

    var app = angular.module('app.App', ['CheckModule', 'CurrentQuestionModule', 'CurrentQuestionnaireModule', 'QuestionnaireServiceModule', 'QuestionServiceModule', 'RoleServiceModule', 'SessionServiceModule', 'TagServiceModule', 'UserServiceModule']);
});


 
