describe('controller.user.User', function() {

    var $location;
    var $rootScope;
    var $scope;
    var $cookies;
    var controller;
    var users = [
        {
            _id: 'id_user_1',
            userName: 'mario.rossi',
            fullName: 'Mario Rossi',
            role: 'role_id_1'
        },
        {
            _id: 'id_user_2',
            userName: 'giovanni.rossi',
            fullName: 'Giovanni Rossi',
            role: 'role_id_2'
        },
        {
            _id: 'id_user_3',
            userName: 'giacomo.rossi',
            fullName: 'Giacomo Rossi',
            role: 'role_id_3'
        }
    ];
    beforeEach(function() {
        module('app.App', function($provide){
            var UserService = function () {
                this.updateInformation = function(fullName, userName, success, fail) {
                    if (fullName == 'err' || userName == 'err')
                        fail({ data: { message: 'error message' } });
                    else success();
                };
                this.updatePassword = function(newPassword, oldPassword, success, fail) {
                    if (newPassword == 'err' || oldPassword == 'err')
                        fail({ data: { message: 'error message' } });
                    else success();
                };
            };
            $provide.service("model.service.UserService", UserService);
        });
        inject(function($injector) {
            $location = $injector.get('$location');
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $cookies = $injector.get('$cookies');

            $cookies.put('connect.sid', "id_sessione");
            $rootScope.me = { 
                _id: 'user_id_1', 
                userName: 'mario.rossi',
                fullName: 'Mario Rossi',
                role: 'role_id_1'
            };
            $cookies.put('me', $rootScope.me);
            $rootScope.logged = true;

            var $controller = $injector.get('$controller');
            controller = $controller('controller.user.User', {
                $location: $location,
                $rootScope: $rootScope,
                $scope: $scope,
                $cookies: $cookies
            });
        });
    });

    describe('checkFullName', function() {

        it('deve rilevare un nome completo non valido', function() {
            $scope.fullName = 's';
            $scope.checkFullName();
            expect($scope.errorInformation.status).toBe(true);
            expect($scope.errorInformation.name).toBe('errorFullName');
        });

        it('non deve dare errori con nome completo valido', function() {
            $scope.fullName = 'valido';
            $scope.checkFullName();
            expect($scope.errorInformation.status).toBe(false);
        });

    });

    describe('checkPassword', function() {
        
        it('deve rilevare una password non valida', function() {
            $scope.newPassword = 's83';
            $scope.checkPassword();
            expect($scope.errorPassword.status).toBe(true);
            expect($scope.errorPassword.name).toBe('errorPassword');
        });

        it('non deve dare errori con password valido', function() {
            $scope.newPassword = '32d8hd929j0jd0j29j';
            $scope.checkPassword();
            expect($scope.errorInformation.status).toBe(false);
        });

    });

    describe('checkUserName', function() {
        
        it('deve rilevare un nome utente non valido', function() {
            $scope.userName = 'user';
            $scope.checkUserName();
            expect($scope.errorInformation.status).toBe(true);
            expect($scope.errorInformation.name).toBe('errorUserName');
        });

        it('non deve dare errori con nome utente valdio', function() {
            $scope.userName = 'long.enough';
            $scope.checkUserName();
            expect($scope.errorInformation.status).toBe(false);
        });

    });

    describe('checkRepeatPassword', function() {
        
        it('deve rilevare password diverse', function() {
            $scope.newPassword = 'long.enough';
            $scope.repeatPassword = 'this.is.different';
            $scope.checkRepeatPassword();
            expect($scope.errorPassword.status).toBe(true);
            expect($scope.errorPassword.name).toBe('errorRepeatPassword');
        });

        it('non deve dare errori con password uguali', function() {
            $scope.newPassword = 'long.enough';
            $scope.repeatPassword = $scope.newPassword;
            $scope.checkRepeatPassword();
            expect($scope.errorPassword.status).toBe(false);
        });

    });

    describe('submitInformation', function() {
        
        it('deve rilevare errori in aggiornamento', function() {
            $scope.fullName = 'err';
            $scope.userName = 'err';
            $scope.submitInformation();
            expect($scope.errorInformation.status).toBe(true);
            expect($scope.errorInformation.name).toBe('errorInformation');
        });

        it("non deve dare errori se l'aggiornamento ha successo", function() {
            $scope.fullName = 'Mario Rossi';
            $scope.userName = 'mario.rossi';
            $scope.submitInformation();
            expect($scope.errorInformation.status).toBe(false);
            expect($scope.successInformation).toBe(true);
        });

    });

    describe('submitPassword', function() {
        
        it('deve rilevare errori in aggiornamento', function() {
            $scope.newPassword = 'err';
            $scope.oldPassword = 'err';
            $scope.submitPassword();
            expect($scope.errorPassword.status).toBe(true);
            expect($scope.errorPassword.name).toBe('errorPassword');
        });

        it("non deve dare errori se l'aggiornamento ha successo", function() {
            $scope.newPassword = 'old.password';
            $scope.oldPassword = 'new.password';
            $scope.submitPassword();
            expect($scope.errorPassword.status).toBe(false);
            expect($scope.successPassword).toBe(true);
        });

    });

});