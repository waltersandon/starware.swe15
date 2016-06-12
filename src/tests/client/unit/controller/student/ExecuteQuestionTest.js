describe('controller.student.ExecuteQuestion', function() {

    var $rootScope;
    var $scope;
    var controller;
var questions = [
    {
        selectedAnswer: "true",
        type: "TF",
        body: "<p>corpo domanda</p>"
    },
    {
        selectedAnswer: "1",
        type: "MC",
        body: "<p>corpo domanda</p>"
    },
    {
        selectedAnswer: ["0"],
        type: "MA",
        body: "<p>corpo domanda</p>"
    },
    {
        selectedAnswer: ["0"],
        type: "CT",
        body: ["<p>corpo domanda</p>"]
    },
    {
        selectedAnswer: ["primo", "secondo", "terzo" ,"quarto"],
        type: "OI",
        body: "<p>corpo domanda</p>"
    },
    {
        selectedAnswer: {
            left : ["Juventus", "Inter", "Sampdoria" ],
            right: ["Torino", "Milano", "Genova" ]
        },
        type: "CI",
        body: "<p>corpo domanda</p>"
    },
    {
        selectedAnswer: "1",
        type: "NT",
        body: "<p>corpo domanda</p>"
    },
    {
        selectedAnswer: "1",
        type: "NonC'è questo tipo",
        body: "<p>corpo domanda</p>"
    }


];
    beforeEach(function () {
        module('app.App');
    });

    describe('ExecuteQuestion TF', function () {

        beforeEach(function() {
            inject(function ($injector) {
                $rootScope = $injector.get('$rootScope');

                $scope = $rootScope.$new();
                $scope.currentQuestion = questions[0];
                var $controller = $injector.get('$controller');

                controller = $controller('controller.student.ExecuteQuestion', {
                    $rootScope: $rootScope,
                    $scope: $scope
                });
            });
        });

        it('ottiene correttamente la prossima domanda', function () {
            $scope.$apply();
            expect($scope.currentQuestion.body).toBe('<p>corpo domanda</p>');
        });

    });
    describe('ExecuteQuestion MC', function () {

        beforeEach(function() {
            inject(function ($injector) {

                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $scope.currentQuestion = questions[1];
                var $controller = $injector.get('$controller');

                controller = $controller('controller.student.ExecuteQuestion', {
                    $rootScope: $rootScope,
                    $scope: $scope
                });
            });
        });

        it('controllo esecuzione domanda', function () {
            $scope.$apply();
            expect($scope.currentQuestion.body).toBe('<p>corpo domanda</p>');
        });

    });
    describe('ExecuteQuestion MA', function () {

        beforeEach(function() {
            inject(function ($injector) {

                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $scope.currentQuestion = questions[2];
                var $controller = $injector.get('$controller');

                controller = $controller('controller.student.ExecuteQuestion', {
                    $rootScope: $rootScope,
                    $scope: $scope
                });
            });
        });

        it('controllo esecuzione domanda', function () {
            $scope.$apply();
            expect($scope.currentQuestion.body).toBe('<p>corpo domanda</p>');
        });

    });
    describe('ExecuteQuestion CT', function () {

        beforeEach(function() {
            inject(function ($injector) {

                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $scope.currentQuestion = questions[3];
                var $controller = $injector.get('$controller');

                controller = $controller('controller.student.ExecuteQuestion', {
                    $rootScope: $rootScope,
                    $scope: $scope
                });
            });
        });

        it('controllo esecuzione domanda', function () {
            $scope.$apply();
            expect($scope.currentQuestion.body).toEqual(['<p>corpo domanda</p>']);
        });

    });
    describe('ExecuteQuestion OI', function () {

        beforeEach(function() {
            inject(function ($injector) {

                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $scope.currentQuestion = questions[4];
                var $controller = $injector.get('$controller');

                controller = $controller('controller.student.ExecuteQuestion', {
                    $rootScope: $rootScope,
                    $scope: $scope
                });
            });
        });

        it('controllo esecuzione domanda', function () {
            $scope.$apply();
            expect($scope.currentQuestion.body).toEqual('<p>corpo domanda</p>');
        });

    });
    describe('ExecuteQuestion CI', function () {

        beforeEach(function() {
            inject(function ($injector) {

                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $scope.currentQuestion = questions[5];
                var $controller = $injector.get('$controller');

                controller = $controller('controller.student.ExecuteQuestion', {
                    $rootScope: $rootScope,
                    $scope: $scope
                });
            });
        });

        it('controllo esecuzione domanda', function () {
            $scope.$apply();
            expect($scope.currentQuestion.body).toEqual('<p>corpo domanda</p>');
        });

    });
    describe('ExecuteQuestion NT', function () {

        beforeEach(function() {
            inject(function ($injector) {

                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $scope.currentQuestion = questions[6];
                var $controller = $injector.get('$controller');

                controller = $controller('controller.student.ExecuteQuestion', {
                    $rootScope: $rootScope,
                    $scope: $scope
                });
            });
        });

        it('controllo esecuzione domanda', function () {
            $scope.$apply();
            expect($scope.currentQuestion.body).toEqual('<p>corpo domanda</p>');
        });

    });
    describe('ExecuteQuestion di un tipo non esistente', function () {

        beforeEach(function() {
            inject(function ($injector) {

                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $scope.currentQuestion = questions[7];
                var $controller = $injector.get('$controller');

                controller = $controller('controller.student.ExecuteQuestion', {
                    $rootScope: $rootScope,
                    $scope: $scope
                });
            });
        });

        it('controllo esecuzione domanda', function () {
            $scope.$apply();
            expect($scope.currentQuestion.body).toEqual('<p>corpo domanda</p>');
            expect($scope.preview).toBeUndefined();

        });

    });
    describe('ExecuteQuestion senza domanda', function () {

        beforeEach(function() {
            inject(function ($injector) {

                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $scope.currentQuestion = undefined;
                var $controller = $injector.get('$controller');

                controller = $controller('controller.student.ExecuteQuestion', {
                    $rootScope: $rootScope,
                    $scope: $scope
                });
            });
        });

        it('controllo esecuzione domanda', function () {
            $scope.$apply();
            expect($scope.currentQuestion).toBeUndefined();
        });

    });




});