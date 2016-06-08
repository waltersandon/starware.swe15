/*!
 * @class   SignUp
 * @details Classe che gestisce le operazioni e la logica applicativa
 *          riguardante la pagina di Registrazione sul client
 * @par Usage
 * Deve visualizzare campi per l’inserimento della mail, password, nome e
 * cognome. Deve poter gestire l'eventuale caso di errore se la mail dello
 * studente è già presente nel sistema. Inoltre deve poter gestire il caso in
 * cui di la password dello studente non rispetta i parametri prestabiliti
 */


/*!
 * @details costruttore della classe
 * @param[in]  check          campo dati che rappresenta un oggetto Check
 * @param[in]  cookies        oggetto di angular che permette di manipolare
 *                             i cookies
 * @param[in]  location       oggetto di angular che analizza l'URL nella
 *                             barra degli indirizzi del browser e lo rende
 *                             disponibile all'applicazione
 * @param[in]  scope          oggetto di angular che fa riferimento ad una
 *                             porzione di model di pertinenza di uno
 *                             specifico controller
 * @param[in]  rootScope      oggetto di angular che identifica
 *                             l’elemento con attributo ng-app
 * @param[in]  sessionService campo dati che rappresenta un oggetto
 *                             SessionService
 * @param[in]  userService    campo dati che rappresenta un oggetto
 *                             UserService
 */
$(function () {
    angular.module('app.App').controller('controller.public.SignUp', ['util.Check', '$cookies', 'model.data.Error', '$location', '$scope', 'model.service.SessionService', '$rootScope', 'model.service.UserService', function (Check, $cookies, Error, $location, $scope, SessionService, $rootScope, UserService) {
        $scope.error = new Error();

        /*!
         * @details controlla se il nome inserito ha i requisiti minimi richiamando
         *          il relativo metodo nella classe Check
         */
        $scope.checkFullName = function () {
            if ($scope.fullName) {
                $scope.error = Check.checkFullName($scope.fullName);
                return !$scope.error.status;
            } else {
                return false;
            }
        };

        /*!
         * @details controlla se la password inserita ha i requisiti minimi
         *          richiamando il relativo metodo nella classe Check
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
         * @details controlla su lo username ha i requisiti minimi richiamando il
         *          relativo metodo nella classe Check
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
         * @details controlla se la password è uguale a quella inserita nel campo
         *          "Ripeti password"
         */
        $scope.checkRepeatPassword = function () {
            if ($scope.password && $scope.repeatPassword) {
                $scope.error = $scope.password === $scope.repeatPassword ? new Error() : new Error('Le <strong>password</strong> non corrispondono', 'errorRepeatPassword', true, 'alert-warning');
                return !$scope.error.status;
            } else {
                return false;
            }
        };

        /*!
         * @details invia i dati dell'utente al servizio che effettua la
         *          registrazione
         */
        $scope.submit = function () {
            UserService.signUp($scope.fullName, $scope.password, $scope.userName, function () {
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
            }, function (res) {
                $rootScope.logged = false;
                $scope.error = new Error(res.data.message, 'errorSignUp', true, 'alert-danger');
            });
        };
    }]);
});