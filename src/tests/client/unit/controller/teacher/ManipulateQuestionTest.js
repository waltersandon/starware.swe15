/*
describe('controller.teacher.ManipulateQuestion', function() {

    var $location;
    var $rootScope;
    var $scope;
    var $cookies;
    var controller;

    var questionInput = {
        body: '<TF F>\nTesto domanda\nSeconda linea',
        tags: 'id_tag1, id_tag2'
    };

    var question = {
        id: 'id_question_1',
        body: questionInput.body,
        author: 'id_author_1',
        tags: [ 
            { id: 'id_tag_1' },
            { id: 'id_tag_2' }
        ]
    };

    var tags = {
        'tag1_id': {
            id: 'tag1_id',
            name: 'tag1',
            description: 'tag1_description'
        },
        'tag2_id': {
            id: 'tag2_id',
            name: 'tag2',
            description: 'tag2_description'
        },
    };

    var author = {
        id: 'id_author_1',
        userName: 'mario.rossi',
        fullName: 'Mario Rossi',
        role: 'role_id_1'
    };

    beforeEach(function () {
        module('app.App', function ($provide) {
            var QuestionService = function () {
                this.new = function(quest, success, fail) {
                    console.log("NEW QUEST: ", quest);
                };
                this.getByID = function(id, success, fail) {
                    if (id =='id_question_1')
                        success(question);
                    fail();
                };

                this.modify = function(quest, success, fail) {
                    console.log("MODIFY QUEST: ", quest);
                };
            };
            var TagService = function() {
                this.new = function(tag, success, fail) {
                    if (!tags[tag.id])
                        tags[tag.id] = tag;
                    success();
                };
                this.get = function(keywords, success, fail) {
                    var keys = Object.keys(tags);
                    var values = keys.map(function(v) { return tags[v]; });
                    return values;
                };
                this.getByID = function(id, success, fail) {
                    success(tags[id]);
                };
            };
            $provide.service("model.service.TagService", TagService);
            $provide.service("model.service.QuestionService", QuestionService);
        });
    });

    describe('submit - new', function () {

        beforeEach(function() {
            inject(function ($injector) {
                $location = $injector.get('$location');
                $location.path('a/b/new');
                $rootScope = $injector.get('$rootScope');
                $rootScope.urlPath = function () {
                    return $location.path().split('/');
                };
                $scope = $rootScope.$new();
                $cookies = $injector.get('$cookies');
                var $controller = $injector.get('$controller');

                $cookies.put('connect.sid', "id_sessione");
                $rootScope.me = author;
                $cookies.put('me', $rootScope.me);
                $rootScope.logged = true;

                controller = $controller('controller.teacher.ManipulateQuestion', {
                    $location: $location,
                    $rootScope: $rootScope,
                    $scope: $scope,
                    $cookies: $cookies
                });
            });
        });

        it('deve permettere creazione di una domanda', function () {
            expect($scope.edit).toBe(false);

            $scope.editor.value(questionInput.body);
            $scope.tagsInput = questionInput.tags;

            $scope.submit();
            expect($scope.question).toBe(question);
        });

    });

    describe('submit - modify', function () {

        beforeEach(function() {
            inject(function ($injector) {
                $location = $injector.get('$location');
                $location.path('a/b/modify/id_question_1');
                $rootScope = $injector.get('$rootScope');
                $rootScope.urlPath = function () {
                    return $location.path().split('/');
                };
                $scope = $rootScope.$new();
                $cookies = $injector.get('$cookies');
                var $controller = $injector.get('$controller');

                $cookies.put('connect.sid', "id_sessione");
                $rootScope.me = author;
                $cookies.put('me', $rootScope.me);
                $rootScope.logged = true;

                controller = $controller('controller.teacher.ManipulateQuestion', {
                    $location: $location,
                    $rootScope: $rootScope,
                    $scope: $scope,
                    $cookies: $cookies
                });
            });
        });

        it('deve permettere la modifica di una domanda', function () {
            expect($scope.edit).toBe(true);

            $scope.editor.value(questionInput.body);
            $scope.tagsInput = questionInput.tags;

            $scope.submit();
            expect($scope.question).toBe(question);
        });

    });

});
*/