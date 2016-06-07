describe('controller.teacher.ManipulateQuestion', function() {

    var $location;
    var $rootScope;
    var $scope;
    var $cookies;
    var controller;

    var questionInput = {
        body: 'Testo domanda\nSeconda linea(+)',
        tags: 'tag1, tag2'
    };

    var question = {
        id: 'id_question_1',
        body: questionInput.body,
        author: 'id_author_1',
        tags: [ 
            'id_tag1',
            'id_tag2'
        ]
    };

    var tags = {
        'id_tag1': {
            id: 'id_tag1',
            name: 'tag1',
            description: 'tag1_description'
        },
        'id_tag2': {
            id: 'id_tag2',
            name: 'tag2',
            description: 'tag2_description'
        }
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
                };
                this.getByID = function(id, success, fail) {
                    if (id =='id_question_1')
                        success(question);
                    fail();
                };

                this.modify = function(quest, success, fail) {
                };
            };
            var TagService = function() {
                this.new = function(tag, success, fail) {
                    tag._id = 'id_' + tag.name;
                    if (!tags[tag._id])
                        tags[tag._id] = tag;
                    success(tag);
                };
                this.get = function(keywords, success, fail) {
                    var keys = Object.keys(tags);
                    var values = keys.map(function(v) { return tags[v]; });
                    success(values);
                };
                this.getByID = function(id, success, fail) {
                    success(tags[id]);
                };
            };
            var Editor = function() {
                this.editor = function() {
                    function EditorInner() {
                        this.text = '';
                        this.value = function(something) {
                            if (something) this.text = something;
                            else return this.text;
                        };
                    }

                    return new EditorInner();
                };
            };
            $provide.service("model.service.TagService", TagService);
            $provide.service("model.service.QuestionService", QuestionService);
            $provide.service('util.Editor', Editor);
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

        it('deve permettere la creazione di una domanda', function () {
            expect($scope.edit).toBe(false);

            $scope.editor.value(questionInput.body);
            $scope.tagsInput = questionInput.tags;

            $scope.submit();
           /* expect($scope.question.body).toBe(question.body);
            expect($scope.question.tags[0]).toBe(question.tags[0]);
            expect($scope.question.tags[1]).toBe(question.tags[1]);*/
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

        it('deve permettere la creazione di una domanda', function () {
            expect($scope.edit).toBe(true);

            $scope.editor.value(questionInput.body);
            $scope.tagsInput = questionInput.tags;

            $scope.submit();
            expect($scope.question.body).toBe(question.body);
            expect($scope.question.tags[0]).toBe(question.tags[0]);
            expect($scope.question.tags[1]).toBe(question.tags[1]);
        });

    });

});