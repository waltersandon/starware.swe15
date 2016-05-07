describe('controller.teacher.ManipulateQuestionnaire', function() {

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
            questions: ['id_question_1','id_question_2'],
            tags: ['id_tag_1'],
            title: "Questionario Test"
        },
        {
            id: 'id_questionnaire_2',
            author: 'id_author_1',
            questions: ['id_question_1','id_question_2'],
            tags: [ 'id_tag_1'],
            title: "Questionario Test"
        },
        {
            id: 'id_questionnaire_3',
            author: 'id_author_1',
            questions: ['id_question_1','id_question_2'],
            tags: [ 'id_tag_1' ],
            title: "Questionario Test"
        }
    ];
    var author = {
        id: 'id_author_1',
        userName: 'mario.rossi',
        fullName: 'Mario Rossi',
        role: 'role_id_1'
    };
    var testTags = [{
        id: 'id_tag_1',
        name: 'Matematica',
        description: 'Descrizione matematica'
    }];
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
            var QuestionnaireService = function () {
                this.modify = function (questionnaire, success, fail) {
                    return questionnaire.id === 'id_questionnaire_1' ? success() : fail();
                };
                this.new = function (questionnaire, success, fail) {
                    questionnaires.push(questionnaire);
                    success();
                };
                this.getByID = function (id, success, fail) {
                    var testQuestionnaire = questionnaires.find(function (questionnaire) {
                        return questionnaire.id === id
                    });
                    return testQuestionnaire !== undefined ? success(testQuestionnaire) : fail();
                };
            };
            var UserService = function () {
                this.getByID = function(id,success, fail) {
                    return id === 'id_author_1'? success(author) : fail();
                };


            };
            var QuestionService = function () {
                this.getByID = function(author, keywords, tags, success, fail) { //TODO
                    return author[0] === 'id_author_1' ? success(questions) : fail();
                };
            };
            var TagService = function () {
                this.get = function(keywords, success, fail) {
                    return keywords[0] === 'matematica' ?
                        success(testTags) : fail();
                };
                this.getByID = function(id, success, fail) {
                    var testTag = testTags.find(function (tag) {
                        return tag.id === id;
                    });
                    return testTag !== undefined ? success(testTag) : fail();
                };
                this.new = function (tag, success, fail) {
                    testTags.push(tag);
                    success({_id : tag.id});
                }
            };
            var QML = function () {
                this.preview = function(body) {
                    return "<p>QML parsato a HTML"+body+" </p>";
                };
            };
            $provide.service("util.QML", QML);
            $provide.service("model.service.UserService", UserService);
            $provide.service("model.service.QuestionService", QuestionService);
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

            controller = $controller('controller.teacher.ManipulateQuestionnaire', {
                $location: $location,
                $rootScope: $rootScope,
                $scope: $scope,
                $cookies: $cookies
            });
        });
    });
 /*   describe('modifyQuestionnaire', function () {

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
*/



});