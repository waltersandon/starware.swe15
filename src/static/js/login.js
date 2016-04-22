
$(function () {
    $.material.init();
});


angular.module('service', ['QuestionnaireService', 'QuestionService', 'RoleService', 'SessionService', 'TagService', 'UserService']);
angular.module('data', ['Questionnaire', 'Question', 'Role', 'Session', 'Tag', 'User']);
angular.module('util', ['Check', 'CurrentQuestion', 'CurrentQuestionnaire', 'CurrentUser']);

angular.module('Model', ['data', 'service', 'util']);

var app = angular.module('myApp', ['SessionService']);

app.controller('LogIn', ['$location', '$scope', '$rootScope', 'SessionService', function ($location, $scope, $rootScope, SessionService) {
        $scope.submit = function () {
            SessionService.login($scope.password, $scope.userName);
        };
    }]);
