describe('controller.student.Questionnaires', function() {

    var $location;
    var $rootScope;
    var $scope;
    var $cookies;
    var controller;
    var users = [
        {
            id: 'id_author_1',
            userName: 'mario.rossi',
            fullName: 'Mario Rossi',
            role: 'role_id_1'
        }
    ];
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

    var tags = [
         {
            id: 'id_tag_1',
            name: 'tag1',
            description: 'tag1_description'
        }
    ];
    beforeEach(function() {
        module('app.App', function($provide){
            var UserService = function () {
                this.get = function(keywords, b, success, fail) {
                    var keys = Object.keys(users);
                    var values = keys.map(function(v) { return users[v]; });
                    success(values);
                };
                this.getByID = function(id, success, fail) {
                    id === users[0].id ? success(users[0]): fail();
                };
            };
            var TagService = function () {
                this.get = function(keywords, success, fail) {
                    var keys = Object.keys(tags);
                    var values = keys.map(function(v) { return tags[v]; });
                    success(values);
                };
                this.getByID = function(id, success, fail) {
                    id === tags[0].id ? success(tags[0]) : fail();
                };
            };
            var QuestionnaireService = function() {
                this.get = function(authors, tags, titles, success, fail) {
                    success(questionnaires);
                };
            };
            $provide.service("model.service.UserService", UserService);
            $provide.service("model.service.TagService", TagService);
            $provide.service("model.service.QuestionnaireService", QuestionnaireService);
        });
        inject(function($injector) {
            $location = $injector.get('$location');
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $cookies = $injector.get('$cookies');
            var $controller = $injector.get('$controller');
            controller = $controller('controller.student.Questionnaires', {
                $location: $location,
                $rootScope: $rootScope,
                $scope: $scope,
                $cookies: $cookies
            });
        });
    });

    describe('submit', function() {

        it('dovrebbe filtrare e mostrare la lista dei questionari', function() {
        	$scope.authorSearch = 'mario, giovanni';
        	$scope.tagSearch = 'matematica, informatica';
        	$scope.titleSearch = 'questionario';
        	$scope.submit();
        	$scope.$apply();
        	expect($scope.questList[0].id).toBe('id_questionnaire_1');
        });

    });

    describe('executeQuestionnaire', function() {

        it('dovrebbe filtrare e mostrare la lista dei questionari', function() {
        	$scope.executeQuestionnaire('id_question_1');
        	expect($location.path()).toBe('/student/questionnaire/id_question_1');
        });

    });

});