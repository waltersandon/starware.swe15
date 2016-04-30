$(function () {
    angular.module('app.App').controller('controller.public.Home', ['$cookies', '$location', '$rootScope', '$scope', 'model.service.SessionService', 'model.service.UserService', function ($cookies, $location, $rootScope, $scope, SessionService, UserService) {
            $rootScope.logged = 'wait';

            $scope.urlPath = function () {
                return $location.path().split('/');
            };
            $scope.checkLogged = function () {
                if ($cookies.get('connect.sid')) {
                    UserService.getMe(function (me) {
                        $rootScope.me = me;
                        $rootScope.logged = true;
                        $location.path('user');
                    }, function (res) {
                        $rootScope.logged = false;
                    });
                } else {
                    $rootScope.logged = false;
                }
            };

            /*$scope.$on("$locationChangeStart", function (event, next, current) {
                if ($scope.urlPath()[1] === 'login' || $scope.urlPath()[1] === 'signup') {
                    $scope.checkLogged();
                }
            });*/

            $scope.checkLogged();
        }]);
});