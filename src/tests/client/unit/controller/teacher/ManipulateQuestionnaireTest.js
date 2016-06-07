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
                this.getByID = function(id, success, fail) {

                    var testQuestion = questions.find(function (question) {
                        return question.id === id
                    });
                    return testQuestion !== undefined ? success(testQuestion) : fail();                };
            };
            var TagService = function () {
                this.get = function(keywords, success, fail) {
                    return success(testTags);
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
            var Util = function() {
                this.confirm = function(m) { return true; }
                this.alert = function(m) {}
            };
            var QML = function () {
                this.preview = function(body) {
                    return "<p>QML parsato a HTML"+body+" </p>";
                };
            };
            $provide.service("util.QML", QML);
            $provide.service("util.Util", Util);
            $provide.service("model.service.UserService", UserService);
            $provide.service("model.service.QuestionService", QuestionService);
            $provide.service("model.service.QuestionnaireService", QuestionnaireService);
            $provide.service("model.service.TagService", TagService);
        });


    });
    describe('Modifica del  questionario', function () {
        beforeEach(function () {
            inject(function ($injector) {
                $location = $injector.get('$location');
                $location.path('teacher/questionnaires/modify/id_questionnaire_1');
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $scope.urlPath = function () {
                    return $location.path().split('/');
                };
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
        it('deve modificare il  questionario modificando numero delle domande', function () {
            expect($scope.questionnaire).toBeDefined();
            expect($location.path()).toBe('/teacher/questionnaires/modify/id_questionnaire_1');
            expect($scope.questionnaire.questions.length).toEqual(2);
            $scope.addQuestion(questions[2]);
            expect($scope.questionnaire.questions.length).toEqual(3);
            $scope.addQuestion(questions[2]);
            expect($scope.questionnaire.questions.length).toEqual(4);
            $scope.removeQuestion(questions[2]);
            expect($scope.questionnaire.questions.length).toEqual(3);
            $scope.submit();
            expect(questionnaires[0].questions.length).toEqual(3);
            $scope.$apply();
        });


    });
    describe('Creazione del questionario', function () {
        beforeEach(function () {
            inject(function ($injector) {
                $location = $injector.get('$location');
                $location.path('teacher/questionnaires/new');
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $scope.urlPath = function () {
                    return $location.path().split('/');
                };
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
        it('deve creare il questionnario', function () {
            $scope.$apply();
            expect($scope.questionnaire).toBeDefined();
            expect($location.path()).toBe('/teacher/questionnaires/new');
            expect($scope.questionnaire.questions.length).toEqual(0);
            $scope.addQuestion(questions[0]);
            $scope.addQuestion(questions[1]);
            $scope.addQuestion(questions[2]);
            $scope.tagsInput = 'Matematica';
            $scope.questionnaire.title = "Quiz test ManipulateQuestionnaire";
            expect($scope.questionnaire.questions.length).toEqual(3);
            $scope.submit();
            expect(questionnaires[3].questions.length).toEqual(3);
            expect(questionnaires[3].title).toEqual("Quiz test ManipulateQuestionnaire");
        });

    });




});