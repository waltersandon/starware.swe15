describe('controller.teacher.ManageTags', function() {

    var $location;
    var $rootScope;
    var $scope;
    var $cookies;
    var controller;

    var tags = [
        {
            id: 'tag1_id',
            name: 'tag1',
            description: 'tag1_description'
        },
        {
            id: 'tag1_id_sister',
            name: 'tag1_sister',
            description: 'tag1_sister_description'
        },
        {
            id: 'tag2_id',
            name: 'tag2',
            description: 'tag2_description'
        },
    ];

    beforeEach(function () {
        module('app.App', function ($provide) {
            var TagService = function() {
                this.new = function(tag, success, fail) {
                    if (tag.name == 'tag4' && tag.description == 'tag4_description')
                        success();
                    else fail();
                };
                this.get = function(keywords, success, fail) {
                    if (keywords[0] == 'tag1' && keywords[1] == 'tag2')
                        success(tags);
                    else fail(null);
                };
                this.modify = function(tag, success, fail) {
                    if (tag.name == 'tag2' && tag.description == 'tag2_desc')
                        success();
                    else fail();
                };
                this.delete = function(tag, success, fail) {
                    if (tag.name == 'tag2' && tag.description == 'tag2_desc')
                        success();
                    else fail();
                };
            };
            var Util = function() {
                this.confirm = function(m) { return true; }
                this.alert = function(m) {}
            };
            $provide.service("util.Util", Util);
            $provide.service("model.service.TagService", TagService);
        });

        inject(function ($injector) {
            $location = $injector.get('$location');
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $cookies = $injector.get('$cookies');
            var $controller = $injector.get('$controller');

            controller = $controller('controller.teacher.ManageTags', {
                $location: $location,
                $rootScope: $rootScope,
                $scope: $scope,
                $cookies: $cookies
            });
        });
    });

    describe('submit', function () {

        it('deve aggiornare i risultati in base alle keywords inserite', function () {
            $scope.tagSearch = 'tag1 tag2';
            $scope.submit();
            expect($scope.tags[0].name).toBe('tag1');
            expect($scope.tags[1].name).toBe('tag1_sister');
            expect($scope.tags[2].name).toBe('tag2');
        });

    });

    describe('add', function () {

        it('deve aggiornare i risultati in base alle keywords inserite', function () {
            $scope.newName = 'tag4';
            $scope.newDescription = 'tag4_description';
            $scope.tagSearch = 'tag1 tag2';
            $scope.add();
            expect($scope.newName).toBe("");
            expect($scope.newDescription).toBe("");
            expect($scope.tagSearch).toBe("");
        });

    });

    describe('modify', function () {

        it("deve modificare l'argomento specificato", function () {
            $scope.tags = [
                { btnClass: 'btn-default', name: 'tag1', 'description': 'tag1_desc' }, 
                { btnClass: 'class2', name: 'tag2', 'description': 'tag2_desc' }, 
                { btnClass: 'btn-default', name: 'tag3', 'description': 'tag3_desc' }, 
            ];
            $scope.modify($scope.tags[1]);
            expect($scope.tags[1].btnClass).toBe('btn-default');
        });

    });

    describe('remove', function () {

        it('deve aggiornare i risultati in base alle keywords inserite', function () {
            $scope.tags = [
                { btnClass: 'btn-default', name: 'tag1', 'description': 'tag1_desc' }, 
                { btnClass: 'btn-default', name: 'tag2', 'description': 'tag2_desc' }, 
                { btnClass: 'btn-default', name: 'tag3', 'description': 'tag3_desc' }, 
            ];
            $scope.remove($scope.tags[1]);
            expect($scope.tags.length).toBe(2);
            expect($scope.tags[0].name).toBe('tag1');
            expect($scope.tags[1].name).toBe('tag3');
        });

    });

});