describe('controller.teacher.ManageQuestions', function() {

    var $location;
    var $rootScope;
    var $scope;
    var $cookies;
    var controller;
    var loggedUser = { 
        id: 'id_author_1', 
        userName: 'mario.rossi',
        fullName: 'Mario Rossi',
        role: 'role_id_1'
    };
    var questions = [
        {
            id: 'id_question_1',
            body: '<TF F>\nTesto domanda\nSeconda linea',
            author: 'id_author_1',
            tags: [ { id: 'id_tag_1' } ]
        },
        {
            id: 'id_question_2',
            body: '<TF F>\nTesto domanda\nSeconda linea',
            author: 'id_author_1',
            tags: [ { id: 'id_tag_1' } ]
        },
        {
            id: 'id_question_3',
            body: '<TF F>\nTesto domanda\nSeconda linea',
            author: 'id_author_1',
            tags: [ { id: 'id_tag_1' } ]
        }
    ];

    function confirm() { return true; }

    beforeEach(function () {
        module('app.App', function ($provide) {
            var QuestionService = function () {
                this.delete = function(question, success, fail) {
                    success();
                };

                this.get = function(author, keywords, tags, next, err) {
                    next(questions);
                };
            };
            var TagService = function () {
                this.getByID = function(id, success, fail) {
                    success({
                        id: id,
                        name: 'Matematica',
                        description: 'Descrizione matematica'
                    });
                };
            };
            var Util = function() {
                this.confirm = function(m) { return true; }
                this.alert = function(m) {}
            };
            $provide.service("util.Util", Util);
            $provide.service("model.service.QuestionService", QuestionService);
            $provide.service("model.service.TagService", TagService);
        });

        inject(function ($injector) {
            $location = $injector.get('$location');
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $cookies = $injector.get('$cookies');
            var $controller = $injector.get('$controller');

            $cookies.put('connect.sid', "id_sessione");
            $rootScope.me = loggedUser;
            $cookies.put('me', $rootScope.me);
            $rootScope.logged = true;

            controller = $controller('controller.teacher.ManageQuestions', {
                $location: $location,
                $rootScope: $rootScope,
                $scope: $scope,
                $cookies: $cookies
            });
        });
    });

    describe('preview', function () {

        it('deve ritornare la prima riga della domanda', function () {
            $scope.questions = questions;
            var preview = $scope.preview($scope.questions[1].body);
            expect(preview).toBe('Testo domanda');
        });

    });

    describe('modifyQuestion', function () {

        it('deve rendirizzare alla pagina di modifica della domanda', function () {
            $scope.questions = questions;
            $scope.modifyQuestion($scope.questions[1]);
            expect($location.path()).toBe('/teacher/questions/modify/id_question_2');
        });

    });

    describe('deleteQuestion', function () {

        it('deve correttamente eliminare la domanda selezionata', function () {
            $scope.questions = questions;
            expect($scope.questions.length).toBe(3);
            $scope.deleteQuestion($scope.questions[1]);
            expect($scope.questions.length).toBe(2);
            expect($scope.questions[0].id).toBe('id_question_1');
            expect($scope.questions[1].id).toBe('id_question_3');

        });

    });

});