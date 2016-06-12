describe('controller.user.Welcome', function() {

    var $rootScope;
    var $scope;
    var controller;


    var score = [
        {
            _id: "test_score_1",
            question: "id_question_1",
            questionnaire: "id_questionnaire_1",
            author: "user_id_1",
            score: 1
        },
        {
            _id: "test_score_2",
            question: "id_question_2",
            questionnaire: "id_questionnaire_1",
            author: "user_id_1",
            score: 1
        }
    ];
    beforeEach(function() {
        module('app.App', function($provide){
            var AnswerService = function () {
                this.get = function(questionnaire,question,author, next, err) {
                    author == "user_id_1" ? next(score):next([]);


                };
            };
            $provide.service("model.service.AnswerService", AnswerService);
        });

    });

    describe('Check Welcome utente con statistiche ', function() {
        beforeEach(function() {

            inject(function($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();

                $rootScope.me = {
                    id: 'user_id_1',
                    userName: 'mario.rossi',
                    fullName: 'Mario Rossi',
                    role: 'role_id_1'
                };
                $rootScope.logged = true;

                var $controller = $injector.get('$controller');
                controller = $controller('controller.user.Welcome', {
                    $rootScope: $rootScope,
                    $scope: $scope
                });
            });
        });
        it('utente con statistiche', function() {
            expect($scope.data).toBeDefined();
            expect($scope.data[0]).toEqual(0);
            expect($scope.data[1]).toEqual(2);
            expect($scope.labels).toBeDefined();
            expect($scope.labels[0]).toEqual("0 punti");
            expect($scope.labels[1]).toEqual("1 punto");

        });

    });
    describe('Check Welcome utente senza statistiche ', function() {

        beforeEach(function() {

            inject(function($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();

                $rootScope.me = {
                    id: 'user_id_2',
                    userName: 'mario.rossi',
                    fullName: 'Mario Rossi',
                    role: 'role_id_1'
                };
                $rootScope.logged = true;

                var $controller = $injector.get('$controller');
                controller = $controller('controller.user.Welcome', {
                    $rootScope: $rootScope,
                    $scope: $scope
                });
            });
        });
        it('utente senza statistiche', function() {
            expect($scope.stat).toBeUndefined();
            expect($scope.data).toBeUndefined();
            expect($scope.labels).toBeUndefined();
        });

    });
    describe('Check Welcome utente non loggato ', function() {

        beforeEach(function() {

            inject(function($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();

                $rootScope.me = null;
                $rootScope.logged = false;

                var $controller = $injector.get('$controller');
                controller = $controller('controller.user.Welcome', {
                    $rootScope: $rootScope,
                    $scope: $scope
                });
            });
        });
        it('utente non logato', function() {
            expect($scope.data).toBeUndefined();
            expect($scope.labels).toBeUndefined();
            expect($scope.me.fullName).toEqual('Visitatore');
        });

    });


});