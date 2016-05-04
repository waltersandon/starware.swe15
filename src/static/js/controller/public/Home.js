$(function () {
    angular.module('app.App').controller('controller.public.Home', ['$cookies', '$location', '$rootScope', '$scope', 'model.service.UserService', function ($cookies, $location, $rootScope, $scope, UserService) {
            $rootScope.logged = 'wait';

            $rootScope.urlPath = function () {
                return $location.path().split('/');
            };
            $scope.checkLogged = function () {
                if ($cookies.get('connect.sid')) {
                    UserService.getMe(function(me) {
                        $rootScope.me = me;
                        $rootScope.logged = true;
                    }, function (res) {
                        $rootScope.logged = false;
                    });
                } else {
                    $rootScope.logged = false;
                }
            };
            $scope.checkLogged();
        }]);
});
