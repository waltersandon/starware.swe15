describe('controller.teacher.SelectQuestion', function() {

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
    var author = {
        id: 'id_author_1',
        userName: 'mario.rossi',
        fullName: 'Mario Rossi',
        role: 'role_id_1'
    };
    var testTag = {
        id: 'id_tag_1',
        name: 'Matematica',
        description: 'Descrizione matematica'
    };
    var questions = [
        {
            id: 'id_question_1',
            body: '<TF F>\nTesto domanda\nSeconda linea',
            author: 'id_author_1',
            tags: [ 'id_tag_1']
        },
        {
            id: 'id_question_2',
            body: '<TF F>\nTesto domanda\nSeconda linea',
            author: 'id_author_1',
            tags: ['id_tag_1']
        },
        {
            id: 'id_question_3',
            body: '<TF F>\nTesto domanda\nSeconda linea',
            author: 'id_author_1',
            tags: ['id_tag_1']
        }
    ];

    beforeEach(function () {
        module('app.App', function ($provide) {
            var QuestionService = function () {
                this.get = function(author, keywords, tags, success, fail) {
                    return author[0] === 'id_author_1' ? success(questions) : fail();
                };
            };
            var TagService = function () {
                this.get = function(keywords, success, fail) {
                    return keywords[0] === 'matematica' ?
                        success([testTag]) : fail();
                };
                this.getByID = function(id, success, fail) {
                    return id === 'id_tag_1' ?
                        success(testTag) : fail();
                };
            };
            var UserService = function () {
                this.get = function(fullName, userName,success, fail) {
                    return fullName[0] === 'Mario Rossi'?
                        success([author]) : fail();
                };
                this.getByID = function(id,success, fail) {
                    return id === 'id_author_1'? success(author) : fail();
                };
                
            };
            $provide.service("model.service.UserService", UserService);
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

            controller = $controller('controller.teacher.SelectQuestion', {
                $location: $location,
                $rootScope: $rootScope,
                $scope: $scope,
                $cookies: $cookies
            });
        });
    });

    describe('submit', function () {


        it('deve inizializzare la lista con delle domande', function () {
            $scope.authorSearch = 'Mario Rossi';
            $scope.tagSearch = 'matematica';
            $scope.submit();
            $scope.$apply();
            expect($scope.questions.length).toBe(3);
            expect($scope.questions[0].id).toBe('id_question_1');
            expect($scope.questions[1].id).toBe('id_question_2');
            expect($scope.questions[2].id).toBe('id_question_3');
        });

    });

});