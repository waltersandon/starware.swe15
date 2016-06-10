/**
 * @file App.js
 * @date 20/04/2016
 * @version 2.0
 * @author Nicola De Cao
 *
 */

/*!
 * @class   App
 * @details Classe che si occupa di avviare il client e attivare i moduli
 *          angularjs
 */
$(function () {
    $.material.init();

    angular.module('app.App', ['ngCookies', 'ngSanitize', 'CheckModule', 'EditorModule', 'ErrorModule', 'QMLModule', 'QuestionnaireServiceModule', 'QuestionServiceModule', 'RoleServiceModule', 'SessionServiceModule', 'TagServiceModule', 'UserServiceModule', 'CurrentQuestionnaireModule', 'CurrentQuestionModule', 'UtilModule', 'AnswerServiceModule', 'chart.js']);

});