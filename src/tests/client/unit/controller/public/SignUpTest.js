describe('controller.public.SignUp', function() {

    var $location;
    var $rootScope;
    var $scope;
    var $cookies;
    var controller;
    beforeEach(function () {
        module('app.App', function ($provide) {
            var UserService = function () {
                this.getMe = function (success, fail) {
                    return success({
                        _id: 'id_user',
                        userName: 'mario.rossi',
                        fullName: 'Mario Rossi',
                        role: 'id_ruolo'
                    });
                };
                this.signUp = function (fullName, password, userName, next, err) {
                    userName === 'mario.rossi' ?
                        next() : err({data: {message: 'errore registrazione'}});
                }
            };
            var Check = function () {
                this.checkPassword = function (password) {
                    return password.length >= 6 ? {status: false}: {status: true} ;
                };
                this.checkUserName = function (userName) {
                    return userName.length >= 6 ? {status: false}: {status: true} ;
                };
                this.checkFullName = function (fullName) {
                    return fullName.length >= 2 ? {status: false}: {status: true} ;
                };

            };
            var SessionService = function () {
                this.login = function (password, userName, next, err) {
                    password === 'password' && userName === 'mario.rossi' ?
                        next() : err({data: {message: 'errore password'}});
                };
            };

            $provide.service("model.service.UserService", UserService);
            $provide.service("util.Check", Check);
            $provide.service("model.service.SessionService", SessionService);
        });
        inject(function ($injector) {
            $location = $injector.get('$location');
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $cookies = $injector.get('$cookies');
            var $controller = $injector.get('$controller');
            controller = $controller('controller.public.SignUp', {
                $location: $location,
                $rootScope: $rootScope,
                $scope: $scope,
                $cookies: $cookies
            });
        });
    });

    describe('checkPassword', function () {

        it('deve eseguire il controllo sul formato del password', function () {
            $scope.password = 'password';
            expect($scope.checkPassword()).toBe(true);

        });
        it('deve eseguire il controllo sul formato del password sbagliato', function () {
            $scope.password = 'pass';
            expect($scope.checkPassword()).toBe(false);

        });

    });
    describe('checkRepeatPassword', function () {

        it('deve eseguire il controllo sulla ugualianza tra password e repeatPassword', function () {
            $scope.password = 'password';
            $scope.repeatPassword = 'password';
            expect($scope.checkRepeatPassword()).toBe(true);

        });
        it('deve eseguire il controllo sulla ugualianza tra password e repeatPassword sbagliato', function () {
            $scope.password = 'password';
            $scope.repeatPassword = 'drowssa'
            expect($scope.checkRepeatPassword()).toBe(false);

        });

    });
    describe('checkUserName', function () {

        it('deve eseguire il controllo sul formato del userName', function () {
            $scope.userName = 'mario.rossi';
            expect($scope.checkUserName()).toBe(true);

        });
        it('deve eseguire il controllo sul formato del userName sbagliato', function () {
            $scope.userName = 'm';
            expect($scope.checkUserName()).toBe(false);

        });


    });
    describe('checkFullName', function () {

        it('deve eseguire il controllo sul formato del fullName', function () {
            $scope.fullName = 'Mario Rossi';
            expect($scope.checkFullName()).toBe(true);

        });
        it('deve eseguire il controllo sul formato del fullName sbagliato', function () {
            $scope.fullName = 'm';
            expect($scope.checkFullName()).toBe(false);

        });


    });
    describe('submit', function () {

        it('deve effetuare signUp con credenziali giusti', function () {
            $scope.userName = 'mario.rossi';
            $scope.password = 'password';
            $scope.fullName = 'Mario Rossi';
                $scope.submit();
            expect($scope.logged).toBe(true);
            expect($scope.me).toEqual({
                _id: 'id_user',
                userName: 'mario.rossi',
                fullName: 'Mario Rossi',
                role: 'id_ruolo'
            });
        });

        it('deve segnalare errore di login con credenziali sbagliati', function () {
            $scope.userName = 'mario.bianchi';
            $scope.password = 'password';
            $scope.fullName = 'Mario Rossi';
            $scope.submit();
            expect($scope.logged).toBe(false);
            expect($scope.error).toBeDefined();
            expect($scope.error.message).toEqual('errore registrazione');
        });


    });

});