/**
 * @file Home.js
 * @date 21/04/2016
 * @version 2.0
 * @author Thomas Pigarelli
 *
 */

/*!
 * @class   Home
 * @details Classe che si occupa della gestione della home page di un utente
 *          generico registrato
 */

/*!
 * @details costruttore della classe
 * @param[in]  scope          oggetto di angular che fa riferimento ad una
 *                             porzione di model di pertinenza di uno
 *                             specifico controller
 * @param[in]  rootScope      oggetto di angular che identifica
 *                             l’elemento con attributo ng-app
 * @param[in]  sessionService campo dati che rappresenta un oggetto
 *                             SessionService
 * @param[in]  cookies        oggetto di angular che permette di manipolare
 *                             i cookies
 */
$(function () {
    angular.module('app.App').controller('controller.user.Home', ['$cookies', '$rootScope', '$scope', '$location', 'model.service.SessionService', 'util.Util', function ($cookies, $rootScope, $scope, $location, SessionService, Util) {

    /*!
     * @details esegue il logout dell'utente che è autenticato distruggendo i
     *          cookies di sessione
     */
        $scope.logout = function () {
            this.out = function(){
                SessionService.logout(function () {
                    $rootScope.me = {};
                    $rootScope.logged = false;
                    $cookies.remove('connect.sid');
                    $cookies.remove('me');
                    $location.path('');
                }, function (res) {
                    console.log(res.data.message);
                });
            };
            if(($rootScope.urlPath()[1] === "student" && $rootScope.urlPath()[2] === "questionnaire") ||
                ($rootScope.urlPath()[1] === "teacher" && $rootScope.urlPath()[2] === "questions" && ($rootScope.urlPath()[3] === "modify" || $rootScope.urlPath()[3] === "new")) ||
                ($rootScope.urlPath()[1] === "teacher" && $rootScope.urlPath()[2] === "questionnaires" && ($rootScope.urlPath()[3] === "modify" || $rootScope.urlPath()[3] === "new"))){
                if (Util.confirm('Sicuro voler di abbandonare la pagina corrente? Le modifiche non verranno salvate')) {
                    this.out();
                }
            }
            else{
                this.out();
            }
        };

        $rootScope.changePath = function(path){
            if(($rootScope.urlPath()[1] === "student" && $rootScope.urlPath()[2] === "questionnaire") ||
                ($rootScope.urlPath()[1] === "teacher" && $rootScope.urlPath()[2] === "questions" && ($rootScope.urlPath()[3] === "modify" || $rootScope.urlPath()[3] === "new")) ||
                ($rootScope.urlPath()[1] === "teacher" && $rootScope.urlPath()[2] === "questionnaires" && ($rootScope.urlPath()[3] === "modify" || $rootScope.urlPath()[3] === "new") && $rootScope.dirt)){
                if (Util.confirm('Sicuro voler di abbandonare la pagina corrente? Le modifiche non verranno salvate')) {
                    $location.path(path);
                }
            }
            else{
                $location.path(path);
            }
        };

        /*$rootScope.$on("$locationChangeStart", function (event, next, current) {
            if(current.split('/')[4] === "student" && current.split('/')[5] === "questionnaire"){
                if (!Util.confirm('Sure?')) {
                    event.preventDefault();
                }
            }
        });*/
    }]);
});