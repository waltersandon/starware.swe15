/*!
 * @class   LogIn
 * @details Classe che gestisce le operazioni e la logica applicativa
 *          riguardante la pagina di autenticazione sul client
 * @par Usage
 * Viene utilizzata per generare la pagina di autenticazione all’applicazione.
 * Prima della creazione della view viene effettuato un controllo
 * sull’esistenza di una sessione utente. In caso positivo il controller si
 * occuperà di visualizzare la home dell'utente loggato, altrimenti si
 * procederà alla pagina di Login predefinita.
 */


/*!
 * @details costruttore della classe
 * @param[in]  check          campo dati che rappresenta un oggetto Check
 * @param[in]  cookies        oggetto di angular che permette di manipolare
 *                             i cookies
 * @param[in]  location       oggetto di angular che analizza l'URL nella
 *                             barra degli indirizzi del browser e lo rende
 *                             disponibile all'applicazione
 * @param[in]  userService    campo dati che rappresenta un oggetto
 *                             UserService
 * @param[in]  rootScope      oggetto di angular che identifica
 *                             l’elemento con attributo ng-app
 * @param[in]  scope          oggetto di angular che fa riferimento ad una
 *                             porzione di model di pertinenza di uno
 *                             specifico controller
 * @param[in]  sessionService campo dati che rappresenta un oggetto
 *                             SessionService
 */
$(function () {
    angular.module('app.App').controller('controller.public.LogIn', ['util.Check', '$cookies', 'model.data.Error', '$location', '$scope', '$rootScope', 'model.service.SessionService', 'model.service.UserService', function (Check, $cookies, Error, $location, $scope, $rootScope, SessionService, UserService) {
        $scope.error = new Error();

        /*!
         * @details metodo che controlla che la password inserita rispetti alcuni
         *          parametri richiamando il relativo metodo nella classe Check
         */
        $scope.checkPassword = function () {
            if ($scope.password) {
                $scope.error = Check.checkPassword($scope.password);
                return !$scope.error.status;
            } else {
                return false;
            }
        };

        /*!
         * @details metodo che controlla che l'userName inserito rispetti alcuni
         *          parametri richiamando il relativo metodo nella classe Check
         */
        $scope.checkUserName = function () {
            if ($scope.userName) {
                $scope.error = Check.checkUserName($scope.userName);
                return !$scope.error.status;
            } else {
                return false;
            }
        };
        
        /*!
         * @details invia lo username e la password dell'utente al servizio che
         *          effettua l'autenticazione istanziando una nuova sessione
         */
        $scope.submit = function () {
            SessionService.login($scope.password, $scope.userName, function () {
                UserService.getMe(function (me) {
                    $rootScope.me = me;
                    $rootScope.logged = true;

                    var now = new Date();
                    $cookies.putObject('me', me, {expires: new Date(now.getFullYear() + 1, now.getMonth(), now.getDate())});

                    $location.path('user');
                }, function (res) {
                    $rootScope.logged = false;
                    $scope.error = new Error(res.data.message, 'errorGetMe', true, 'alert-danger');
                });
            }, function (res) {
                $rootScope.logged = false;
                $scope.error = new Error(res.data.message, 'errorLogin', true, 'alert-danger');
            });
        };
    }]);
});
