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
            expect($scope.tagList[0].name).toBe('tag1');
            expect($scope.tagList[1].name).toBe('tag1_sister');
            expect($scope.tagList[2].name).toBe('tag2');
        });

    });

    describe('newTag', function () {

        it('deve aggiornare i risultati in base alle keywords inserite', function () {
            $scope.newName = 'tag4';
            $scope.newDescription = 'tag4_description';
            $scope.tagSearch = 'tag1 tag2';
            $scope.newTag();
            expect($scope.newName).toBe("");
            expect($scope.newDescription).toBe("");
            expect($scope.tagSearch).toBe("");
        });

    });

    describe('modifyTag', function () {

        it("deve modificare l'argomento specificato", function () {
            $scope.tagList = [
                { btnClass: 'btn-default', name: 'tag1', 'description': 'tag1_desc' }, 
                { btnClass: 'class2', name: 'tag2', 'description': 'tag2_desc' }, 
                { btnClass: 'btn-default', name: 'tag3', 'description': 'tag3_desc' }, 
            ];
            $scope.modifyTag(1);
            expect($scope.tagList[1].btnClass).toBe('btn-default');
        });

    });

    describe('textChanged', function () {

        it('deve aggiornare la lista delle classi', function () {
            $scope.tagList = [
                { btnClass: 'class1' }, 
                { btnClass: 'class2'},
                { btnClass: 'class3'}
            ];
            $scope.textChanged(1);
            expect($scope.tagList[0].btnClass).toBe('class1');
            expect($scope.tagList[1].btnClass).toBe('btn-raised btn-primary');
            expect($scope.tagList[2].btnClass).toBe('class3');
        });

    });

    describe('deleteTag', function () {

        it('deve aggiornare i risultati in base alle keywords inserite', function () {
            $scope.tagList = [
                { btnClass: 'btn-default', name: 'tag1', 'description': 'tag1_desc' }, 
                { btnClass: 'btn-default', name: 'tag2', 'description': 'tag2_desc' }, 
                { btnClass: 'btn-default', name: 'tag3', 'description': 'tag3_desc' }, 
            ];
            $scope.deleteTag(1);
            expect($scope.tagList.length).toBe(2);
            expect($scope.tagList[0].name).toBe('tag1');
            expect($scope.tagList[1].name).toBe('tag3');
        });

    });

});