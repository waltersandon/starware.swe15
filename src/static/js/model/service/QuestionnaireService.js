
angular.module('QuestionnaireService', []).service('QuestionnaireService', ['$http', function ($http) {
        this.delete = function (questionnaire) {
            $http.delete('/questionnaire/' + questionnaire.id).then(function success(response) {
                console.log(response);
                return true;
            }, function error(response) {
                console.log(response);
                return false;
            });
        };
        this.get = function (author, tags, title) {

        };
        this.getByID = function (id) {

        };
        this.modify = function (questionnaire) {

        };
        this.new = function (questionnaire) {

        };
    }]);
