/*!
 * @class   Check
 * @details Classe che controlla se la password,  l'userName o titolo rispettino
 *          il formato scelto
 */

/*!
 * @details costruttore della classe
 */
$(function () {
    angular.module('CheckModule', ['ErrorModule', 'UserServiceModule', 'QuestionnaireServiceModule']).service('util.Check', ['model.data.Error', 'model.service.QuestionnaireService', function (Error, QuestionnaireService) {
        this.checkFullName = function (userName) {
            return userName.length >= 2 ? new Error() : new Error('Il <strong>nome completo</strong> deve avere almeno <strong>2</strong> caratteri', 'errorFullName', true, 'alert-warning');
        };

        /*!
         * @details metodo che controlla la conformità della password rispetto ai
         *          parametri scelti: che sia maggiore o uguale a 6 caratteri
         * @param[in]  password contiene la password da controllare
         */
        this.checkPassword = function (password) {
            return password.length >= 6 ? new Error() : new Error('La <strong>password</strong> deve avere almeno <strong>6</strong> caratteri', 'errorPassword', true, 'alert-warning');
        };

        /*!
         * @details metodo che controlla la conformità del titolo rispetto ai
         *          parametri scelti: che non sia vuoto
         * @param[in]  title contiene il titolo da controllare
         */
        this.checkTitle = function (title, next, err) {
            QuestionnaireService.get(null, null, title, function (questionnaires) {
                var ret = false;
                questionnaires.forEach(function (item) {
                    if (item.title === title) {
                        ret = true;
                    }
                });
                next(ret);
            }, function (res) {
                err(res);
            });
        };

        /*!
         * @details metodo che controlla la conformità dell'username rispetto ai
         *          parametri scelti: che sia maggiore o uguale a 6 caratteri
         * @param[in]  userName contiene il username da controllare
         */
        this.checkUserName = function (userName) {
            return userName.length >= 6 ? new Error() : new Error('<strong>L\'username</strong> deve avere almeno <strong>6</strong> caratteri', 'errorUserName', true, 'alert-warning');
        };
    }]);
});