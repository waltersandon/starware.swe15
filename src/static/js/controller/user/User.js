/**
 * @file User.js
 * @date 22/04/2016
 * @version 2.0
 * @author Thomas Pigarelli
 *
 */

/*!
 * @class   User
 * @details Classe per la gestione del profilo di un'utente generico registrato
 */

/*!
 * @details costruttore della classe
 * @param[in]  check       campo dati che rappresenta un oggetto Check
 * @param[in]  rootScope   oggetto di angular che identifica l’elemento
 *                          con attributo ng-app
 * @param[in]  scope       oggetto di angular che fa riferimento ad una
 *                          porzione di model di pertinenza di uno specifico
 *                          controller
 * @param[in]  userService campo dati che rappresenta un oggetto
 *                          UserService
 */
$(function () {
    angular.module('app.App').controller('controller.user.User', ['util.Check', 'model.data.Error', '$rootScope', '$scope', 'model.service.UserService', function (Check, Error, $rootScope, $scope, UserService) {
            $scope.errorInformation = new Error();
            $scope.errorPassword = new Error();
            $scope.fullName = $rootScope.me.fullName;
            $scope.userName = $rootScope.me.userName;
    /*!
     * @details controlla se il nome inserito ha i requisiti minimi richiamando
     *          il relativo metodo nella classe Check
     */
            $scope.checkFullName = function () {
                if ($scope.fullName) {
                    $scope.errorInformation = Check.checkFullName($scope.fullName);
                    return !$scope.errorInformation.status;
                } else {
                    return false;
                }
            };
      
    /*!
     * @details controlla se la password inserita ha i requisiti minimi
     *          richiamando il relativo metodo nella classe Check
     */
            $scope.checkPassword = function () {
                if ($scope.newPassword) {
                    $scope.errorPassword = Check.checkPassword($scope.newPassword);
                    return !$scope.errorPassword.status;
                } else {
                    return false;
                }
            };
      
    /*!
     * @details controlla se lo username abbia i requisiti minimi richiamando il
     *          relativo metodo nella classe Check
     */
            $scope.checkUserName = function () {
                if ($scope.userName) {
                    $scope.errorInformation = Check.checkUserName($scope.userName);
                    return !$scope.errorInformation.status;
                } else {
                    return false;
                }
            };
      
    /*!
     * @details controlla se la password sia uguale a quella inserita nel campo
     *          "Ripeti password"
     */
            $scope.checkRepeatPassword = function () {
                if ($scope.newPassword && $scope.repeatPassword) {
                    $scope.errorPassword = $scope.newPassword === $scope.repeatPassword ? new Error() : new Error('Le <strong>password</strong> non corrispondono', 'errorRepeatPassword', true, 'alert-warning');
                    return !$scope.errorPassword.status;
                } else {
                    return false;
                }
            };
    
    /*!
     * @details invia i dati dell'utente al servizio che ne effettua
     *          l'aggiornamento
     */
            $scope.submitInformation = function () {
                UserService.updateInformation($scope.fullName, $scope.userName, function () {
                    $scope.successInformation = true;
                }, function (res) {
                    $scope.errorInformation = new Error(res.data.message, 'errorInformation', true, 'alert-danger');
                });
            };
      
    /*!
     * @details invia i dati sulla password dell'utente modificata al servizio
     *          che ne effettua l'aggiornamento
     */
            $scope.submitPassword = function () {
                UserService.updatePassword($scope.newPassword, $scope.oldPassword, function () {
                    $scope.successPassword = true;
                }, function (res) {
                    $scope.errorPassword = new Error(res.data.message, 'errorPassword', true, 'alert-danger');
                });
            };
        }]);
});
