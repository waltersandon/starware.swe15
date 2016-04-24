$(function () {
    $.material.init();

    var app = angular.module('quizzipediaApp', ['CheckModule', 'CurrentQuestionModule', 'CurrentQuestionnaireModule', 'QuestionnaireServiceModule', 'QuestionServiceModule', 'RoleServiceModule', 'SessionServiceModule', 'TagServiceModule', 'UserServiceModule']);
});


 
