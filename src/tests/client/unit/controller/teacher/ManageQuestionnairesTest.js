describe('controller.teacher.ManageQuestionnaires', function() {

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
    var questionnaires = [
        {
            id: 'id_questionnaire_1',
            author: 'id_author_1',
            questions: ['testQuestion1','testQuestion2'],
            tags: [ { id: 'id_tag_1' } ],
            title: "Questionario Test"
        },
        {
            id: 'id_questionnaire_2',
            author: 'id_author_1',
            questions: ['testQuestion1','testQuestion2'],
            tags: [ { id: 'id_tag_1' } ],
            title: "Questionario Test"
        },
        {
            id: 'id_questionnaire_3',
            author: 'id_author_1',
            questions: ['testQuestion1','testQuestion2'],
            tags: [ { id: 'id_tag_1' } ],
            title: "Questionario Test"
        }
    ];

    beforeEach(function () {
        module('app.App', function ($provide) {
            var QuestionnaireService = function () {
                this.delete = function(questionnaire, success, fail) {
                    success();
                };

                this.get = function(author, keywords, tags, next, err) {
                    next(questionnaires);
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

            $provide.service("model.service.QuestionnaireService", QuestionnaireService);
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

            controller = $controller('controller.teacher.ManageQuestionnaires', {
                $location: $location,
                $rootScope: $rootScope,
                $scope: $scope,
                $cookies: $cookies
            });
        });
    });
    describe('modifyQuestionnaire', function () {

        it('deve rendirizzare alla pagina di modifica del questionario', function () {
            $scope.questionnaires = questionnaires;
            $scope.modifyQuestionnaire($scope.questionnaires[0]);
            expect($location.path()).toBe('/teacher/questionnaires/modify/id_questionnaire_1');
        });

    });
    describe('deleteQuestionnaire', function () {

        it('deve cancellare questionnario', function () {
            $scope.questionnaires = questionnaires;
            expect($scope.questionnaires.length).toBe(3);
            $scope.deleteQuestionnaire($scope.questionnaires[1]);
            expect($scope.questionnaires.length).toBe(2);
            expect($scope.questionnaires[0].id).toBe('id_questionnaire_1');
            expect($scope.questionnaires[1].id).toBe('id_questionnaire_3');
        });

    });




});