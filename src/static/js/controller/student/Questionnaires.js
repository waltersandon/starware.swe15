$(function () {
    angular.module('app.App').controller('controller.student.Questionnaires', ['$location', '$rootScope', '$scope', '$q', 'model.service.QuestionnaireService', 'model.service.UserService', 'model.service.TagService', function ($location,  $rootScope, $scope, $q, questionnaireService, UserService, TagService) {
        $scope.titleSearch = '';
        $scope.tagSearch = '';
        $scope.authorSearch = '';

        $scope.questList = [];
        $scope.myOrderBy = "title";

        $scope.submit = function () {
            this.authors = function(){

                var deferred = $q.defer();

                if($scope.authorSearch) {
                    UserService.get($scope.authorSearch.split(' '), [], function(aut){
                        var list = [];
                        aut.forEach(function(value,index){
                            list.push(value.id);
                        });
                        if(list.length > 0) {
                            deferred.resolve(list);
                        }
                        else{
                            deferred.reject("Nessun autore corrispondente");
                        }
                    }, function(){
                        deferred.reject();
                    });
                }
                else {
                    deferred.resolve([]);
                }

                return deferred.promise;
            };

            this.tags = function(){

                var deferred = $q.defer();

                if($scope.tagSearch) {
                    TagService.get($scope.tagSearch.split(' '), function(ta){
                        var list = [];
                        ta.forEach(function(value,index){
                            list.push(value.id);
                        });
                        if(list.length > 0) {
                            deferred.resolve(list);
                        }
                        else{
                            deferred.reject("Nessun autore corrispondente");
                        }
                    }, function(){
                        deferred.reject();
                    });
                }
                else {
                    deferred.resolve([]);
                }

                return deferred.promise;
            };

            var titles = [];
            if($scope.titleSearch) {
                titles = $scope.titleSearch.split(' ');
            }

            $q.all([this.authors(), this.tags()]).then(function(result){
                questionnaireService.get(result[0], result[1], titles, function (quest) {
                    $scope.questList = quest;
                }, function () {

                });
            }, function(){
                //Utenti o tag corrispondenti alla ricerca non trovati
                $scope.questList = [];
            });


        };

        $scope.beginQuest = function(questID) {
            $location.path('student/exequestionnaires/'+questID);
        };

        $scope.submit();

    }]);
});