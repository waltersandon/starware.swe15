/**
 * @file UserService.js
 * @date 20/04/2016
 * @version 2.0
 * @author Andrea Venier
 *
 */

/*!
 * @class   UserService
 * @details Questa classe fornisce al client i servizi relativi al profilo,
 *          utilizzando chiamate HTTP agli end-point /api/users e /api/roles
 */


/*!
 * @details costruttore della classe
 * @param[in]  http oggetto del servizio offerto da angulajs per le
 *                   richieste http
 */
$(function () {
    angular.module('UserServiceModule', ['CurrentUserModule', 'ConfigurationModule', 'RoleServiceModule', 'UserModule']).service('model.service.UserService', ['app.Configuration', 'model.data.CurrentUser', '$http', 'model.service.RoleService', 'model.data.User', function (Configuration, CurrentUser, $http, RoleService, User) {

        /*!
         * @details tramite API REST elimina un utente sul server
         * @param[in]  user
         * @param[in]  next questo parametro rappresenta la callback che il metodo
         *                   chiama in caso di successo
         * @param[in]  err  questo parametro rappresenta la callback che il metodo
         *                   chiama in caso di errore
         */
        this.delete = function (user, next, err) {
            $http.delete(Configuration.remote + 'api/users/' + user.id).then(function success(res) {
                next();
            }, function error(res) {
                err(res);
            });
        };

        /*!
         * @details tramite API REST ritorna una lista di utenti sul server filtrate
         *          in base ai parametri
         * @param[in]  fullName contiene il nome del utente da ricercare
         * @param[in]  userName contiene il username dell'utente da ricercare
         * @param[in]  next     questo parametro rappresenta la callback che il
         *                       metodo chiama in caso di successo
         * @param[in]  err      questo parametro rappresenta la callback che il
         *                       metodo chiama in caso di errore
         */
        this.get = function (fullName, userName, next, err) {
            $http.get(Configuration.remote + 'api/users?' +
                'fullName=' + function () {
                    var a = '';
                    if (fullName instanceof Array)
                        fullName.forEach(function (item) {
                            a += item + '|';
                        });
                    if (a.length >= 1)
                        a = a.substr(0, a.length - 1);
                    return a;
                }() +
                '&userName=' + function () {
                    var a = '';
                    if (userName instanceof Array)
                        userName.forEach(function (item) {
                            a += item + '|';
                        });
                    if (a.length >= 1)
                        a = a.substr(0, a.length - 1);
                    return a;
                }()
            ).then(function success(res) {

                var ret = [];
                res.data.forEach(function (item) {
                    ret.push(new User(item.fullName, item._id, item.role, item.userName));
                });

                next(ret);
            }, function error(res) {
                err(res);
            });
        };

        /*!
         * @details tramite API REST ritorna un utente dal server per ID
         * @param[in]  id   contiene id dell'utente da ricercare
         * @param[in]  next questo parametro rappresenta la callback che il metodo
         *                   chiama in caso di successo
         * @param[in]  err  questo parametro rappresenta la callback che il metodo
         *                   chiama in caso di errore
         */
        this.getByID = function (id, next, err) {
            $http.get(Configuration.remote + 'api/users/' + id).then(function success(res) {
                next(new User(res.data.fullName, res.data._id, res.data.role, res.data.userName));
            }, function error(res) {
                err(res);
            });
        };

        /*!
         * @details tramite API REST ritorna l'utente corrente
         * @param[in]  next questo parametro rappresenta la callback che il metodo
         *                   chiama in caso di successo
         * @param[in]  err  questo parametro rappresenta la callback che il metodo
         *                   chiama in caso di errore
         */
        this.getMe = function (next, err) {
            $http.get(Configuration.remote + 'api/users/me').then(function success(res) {
                RoleService.getByID(res.data.role, function (role) {
                    next(new CurrentUser(new User(res.data.fullName, res.data._id, res.data.role, res.data.userName), role));
                }, function (res) {
                    err(res);
                });
            }, function error(res) {
                err(res);
            });
        };

        /*!
         * @details tramite API REST modifica il ruolo dell'utente corrente sul
         *          server
         * @param[in]  user contiene l'utente il cui ruolo deve essere cambiato
         * @param[in]  role contiene il nuovo ruolo dell'utente
         * @param[in]  next questo parametro rappresenta la callback che il metodo
         *                   chiama in caso di successo
         * @param[in]  err  questo parametro rappresenta la callback che il metodo
         *                   chiama in caso di errore
         */
        this.modifyRole = function (user, role, next, err) {
            $http.post(Configuration.remote + 'api/users/' + user.id, {
                role: role
            }).then(function success(res) {
                next();
            }, function error(res) {
                err(res);
            });
        };

        /*!
         * @details tramite API REST crea un nuovo utente sul server
         * @param[in]  fullName contiene il nome del nuovo utente
         * @param[in]  password contiene la password del nuovo utente
         * @param[in]  userName contiene il username del nuovo utente
         * @param[in]  next     questo parametro rappresenta la callback che il
         *                       metodo chiama in caso di successo
         * @param[in]  err      questo parametro rappresenta la callback che il
         *                       metodo chiama in caso di errore
         */
        this.signUp = function (fullName, password, userName, next, err) {
            $http.post(Configuration.remote + 'api/users', {
                fullName: fullName,
                userName: userName,
                password: password
            }).then(function success(res) {
                next();
            }, function error(res) {
                err(res);
            });
        };

        /*!
         * @details tramite API REST modifica le informazioni di profilo dell'utente
         *          corrente sul server
         * @param[in]  fullName contiene il nuovo nome dell'utente
         * @param[in]  userName contiene il nuovo username dell'utente
         * @param[in]  next     questo parametro rappresenta la callback che il
         *                       metodo chiama in caso di successo
         * @param[in]  err      questo parametro rappresenta la callback che il
         *                       metodo chiama in caso di errore
         */
        this.updateInformation = function (fullName, userName, next, err) {
            $http.post(Configuration.remote + 'api/users/me', {
                'fullName': fullName,
                'userName': userName
            }).then(function success(res) {
                next(res.data);
            }, function error(res) {
                err(res);
            });
        };

        /*!
         * @details tramite API REST modifica la password dell'utente corrente sul
         *          server
         * @param[in]  newPassword contiene il nuovo password dell'utente
         * @param[in]  oldPassword contiene la vecchia password dell'utente
         * @param[in]  next        questo parametro rappresenta la callback che il
         *                          metodo chiama in caso di successo
         * @param[in]  err         questo parametro rappresenta la callback che il
         *                          metodo chiama in caso di errore
         */
        this.updatePassword = function (newPassword, oldPassword, next, err) {
            $http.post(Configuration.remote + 'api/users/me', {
                'newPassword': newPassword,
                'oldPassword': oldPassword
            }).then(function success(res) {
                next(res.data);
            }, function error(res) {
                err(res);
            });
        };
    }]);
});