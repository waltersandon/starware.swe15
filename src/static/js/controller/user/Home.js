$(function () {
    angular.module('app.App').controller('controller.user.Home', ['$cookies', '$rootScope', '$scope', '$location', 'model.service.SessionService', 'util.Util', function ($cookies, $rootScope, $scope, $location, SessionService, Util) {

        $scope.logout = function () {
            this.out = function(){
                SessionService.logout(function () {
                    $rootScope.me = {};
                    $rootScope.logged = false;
                    $cookies.remove('connect.sid');
                    $cookies.remove('me');
                    $location.path('');
                }, function (res) {
                    console.log(res.data.message);
                });
            };
            if(($rootScope.urlPath()[1] === "student" && $rootScope.urlPath()[2] === "questionnaire") ||
                ($rootScope.urlPath()[1] === "teacher" && $rootScope.urlPath()[2] === "questions" && ($rootScope.urlPath()[3] === "modify" || $rootScope.urlPath()[3] === "new")) ||
                ($rootScope.urlPath()[1] === "teacher" && $rootScope.urlPath()[2] === "questionnaires" && ($rootScope.urlPath()[3] === "modify" || $rootScope.urlPath()[3] === "new"))){
                if (Util.confirm('Sicuro voler di abbandonare la pagina corrente? Le modifiche non verranno salvate')) {
                    this.out();
                }
            }
            else{
                this.out();
            }
        };


        $rootScope.changePath = function(path){
            if(($rootScope.urlPath()[1] === "student" && $rootScope.urlPath()[2] === "questionnaire") ||
                ($rootScope.urlPath()[1] === "teacher" && $rootScope.urlPath()[2] === "questions" && ($rootScope.urlPath()[3] === "modify" || $rootScope.urlPath()[3] === "new")) ||
                ($rootScope.urlPath()[1] === "teacher" && $rootScope.urlPath()[2] === "questionnaires" && ($rootScope.urlPath()[3] === "modify" || $rootScope.urlPath()[3] === "new") && $rootScope.dirt)){
                if (Util.confirm('Sicuro voler di abbandonare la pagina corrente? Le modifiche non verranno salvate')) {
                    $location.path(path);
                }
            }
            else{
                $location.path(path);
            }
        };

        /*$rootScope.$on("$locationChangeStart", function (event, next, current) {
            if(current.split('/')[4] === "student" && current.split('/')[5] === "questionnaire"){
                if (!Util.confirm('Sure?')) {
                    event.preventDefault();
                }
            }
        });*/
    }]);
});