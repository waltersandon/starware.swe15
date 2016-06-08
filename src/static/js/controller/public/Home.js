/*!
 * @class   Home
 * @details Classe che gestisce le operazioni e la logica applicativa
 *          riguardante la status bar e la slide bar
 */


/*!
 * @details costruttore della classe
 * @param[in]  rootScope   oggetto di angular che identifica l’elemento
 *                          con attributo ng-app
 * @param[in]  cookies     oggetto di angular che permette di manipolare i
 *                          cookies
 * @param[in]  scope       oggetto di angular che fa riferimento ad una
 *                          porzione di model di pertinenza di uno specifico
 *                          controller
 * @param[in]  location    oggetto di angular che analizza l'URL nella
 *                          barra degli indirizzi del browser e lo rende
 *                          disponibile all'applicazione
 * @param[in]  userService campo dati che rappresenta un oggetto
 *                          UserService
 */
$(function () {
    angular.module('app.App').controller('controller.public.Home', ['$cookies', '$location', '$rootScope', '$scope', 'model.service.UserService', function ($cookies, $location, $rootScope, $scope, UserService) {
        $rootScope.logged = 'wait';

        /*!
         * @details restituisce l'array contenente ogni parte del path dell'url
         */
        $rootScope.urlPath = function () {
            return $location.path().split('/');
        };

        /*!
         * @details controlla se l'utente è già loggato controllando i cookies di
         *          sessione
         */
        $scope.checkLogged = function () {
            if ($cookies.get('connect.sid')) {
                UserService.getMe(function (me) {
                    $rootScope.me = me;
                    $rootScope.logged = true;
                }, function (res) {
                    $rootScope.logged = false;
                });
            } else {
                $rootScope.logged = false;
            }
        };
        $scope.checkLogged();
    }]);
});
