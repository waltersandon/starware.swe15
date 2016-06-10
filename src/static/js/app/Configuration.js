/**
 * @file Authorization.js
 * @date 19/04/2016
 * @version 2.0
 * @author Alessio Vitella
 *
 */

/*!
 * @class   Configuration
 * @details Classe che rappresenta i parametri di configurazione del client
 */
$(function () {
    angular.module('ConfigurationModule', []).service('app.Configuration', [function () {
            //this.remote = 'https://quizzipedia-starware.rhcloud.com/';
            this.remote = '';
        }]);
});