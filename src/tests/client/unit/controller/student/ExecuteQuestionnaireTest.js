describe('controller.student.ExecuteQuestionnaire', function() {

    var $location;
    var $rootScope;
    var $scope;
    var $cookies;
    var controller;

    var questions = {
	    'id_question_1': {
	    	id: 'id_question_1',
	    	body: 'Testo domanda 1\n(-)',
	    	author: 'id_author_1',
	    	tags: [
	    		'id_tag_1',
	    		'id_tag_2'
	    	]
	    },
	    'id_question_2': {
	    	id: 'id_question_2',
	    	body: 'Testo domanda 2\n(-)',
	    	author: 'id_author_1',
	    	tags: [
	    		'id_tag_1',
	    		'id_tag_2'
	    	]
	    },
	    'id_question_3': {
	    	id: 'id_question_3',
	    	body: 'Testo domanda 3\n(-)',
	    	author: 'id_author_1',
	    	tags: [
	    		'id_tag_1',
	    		'id_tag_2'
	    	]
	    },
	};

	var questionnaire = {
		id: 'id_questionnaire_1',
		questions: [
			'id_question_1',
			'id_question_2',
			'id_question_3'
		],
		tags: [
    		'id_tag_1',
    		'id_tag_2'
    	],
    	title: 'Titolo questionario'
	};

    beforeEach(function () {
        module('app.App', function ($provide) {
            var QuestionnaireService = function() {
                this.getByID = function(id, success, fail) {
                    if (id === 'id_question_1')
                        success(questionnaire);
                    else fail();
                };
            };
			var QuestionService = function() {
				this.getByID = function(id, success, fail) {
					if (questions[id]) success(questions[id])
					else fail();
				};
			};
            var Util = function() {
                this.confirm = function(m) { return true; }
                this.alert = function(m) {}
            };
            $provide.service("util.Util", Util);
            $provide.service("model.service.QuestionnaireService", QuestionnaireService);
            $provide.service("model.service.QuestionService", QuestionService);
        });
    });

    describe('getNext', function () {

    	beforeEach(function() {
			inject(function ($injector) {
	            $location = $injector.get('$location');
	            $location.path('a/b/id_question_1');

	            $rootScope = $injector.get('$rootScope');
	            $rootScope.urlPath = function () {
                    return $location.path().split('/');
                };
	            $scope = $rootScope.$new();
	            $cookies = $injector.get('$cookies');
	            var $controller = $injector.get('$controller');                

	            controller = $controller('controller.student.ExecuteQuestionnaire', {
	                $location: $location,
	                $rootScope: $rootScope,
	                $scope: $scope,
	                $cookies: $cookies
	            });
	        });
	    });

        it('ottiene correttamente la prossima domanda', function () {
            $scope.$apply();
        	expect($scope.currentQuestion.body).toBe('<p>Testo domanda 1</p>');
            $scope.getNext();
        	expect($scope.currentQuestion.body).toBe('<p>Testo domanda 2</p>');
        });

    });


    describe('getPrevious', function () {

    	beforeEach(function() {
			inject(function ($injector) {
	            $location = $injector.get('$location');
	            $location.path('a/b/id_question_1');

	            $rootScope = $injector.get('$rootScope');
	            $rootScope.urlPath = function () {
                    return $location.path().split('/');
                };
	            $scope = $rootScope.$new();
	            $cookies = $injector.get('$cookies');
	            var $controller = $injector.get('$controller');                

	            controller = $controller('controller.student.ExecuteQuestionnaire', {
	                $location: $location,
	                $rootScope: $rootScope,
	                $scope: $scope,
	                $cookies: $cookies
	            });
	        });
	    });

        it('ottiene correttamente la prossima domanda', function () {
            $scope.$apply();
        	expect($scope.currentQuestion.body).toBe('<p>Testo domanda 1</p>');
            $scope.getNext();
            $scope.getNext();
            $scope.getPrevious();
        	expect($scope.currentQuestion.body).toBe('<p>Testo domanda 2</p>');
        });

    });

    describe('submit', function () {

    	beforeEach(function() {
			inject(function ($injector) {
	            $location = $injector.get('$location');
	            $location.path('a/b/id_question_1');

	            $rootScope = $injector.get('$rootScope');
	            $rootScope.urlPath = function () {
                    return $location.path().split('/');
                };
	            $scope = $rootScope.$new();
	            $cookies = $injector.get('$cookies');
	            var $controller = $injector.get('$controller');                

	            controller = $controller('controller.student.ExecuteQuestionnaire', {
	                $location: $location,
	                $rootScope: $rootScope,
	                $scope: $scope,
	                $cookies: $cookies
	            });
	        });
	    });

        it('corregge correttamente le risposte', function () {
            $scope.$apply();
        	$scope.questionnaire.questions[0].selectedAnswer = 'true';
        	$scope.questionnaire.questions[1].selectedAnswer = 'false';
        	$scope.questionnaire.questions[2].selectedAnswer = 'true';
            $scope.submit();
           // expect($scope.questionnaire.getResult().tot).toBe(3);
           // expect($scope.questionnaire.getResult().point).toBe(1);
        });

    });

});