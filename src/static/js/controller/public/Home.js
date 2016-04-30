$(function () {
    angular.module('app.App').controller('controller.public.Home', ['$cookies', '$location', '$rootScope', '$scope', 'model.service.SessionService', 'model.service.UserService', function ($cookies, $location, $rootScope, $scope, SessionService, UserService) {
            $rootScope.me = true;
            $scope.urlPath = function () {
                return $location.path().split('/');
            };

            if ($cookies.getObject('me')) {
                SessionService.login($cookies.getObject('me').password, $cookies.getObject('me').userName, function () {
                    UserService.getMe($cookies.getObject('me').password, function (me) {
                        $rootScope.me = $cookies.getObject('me');

                        var now = new Date();
                        $cookies.putObject('me', me, {expires: new Date(now.getFullYear() + 1, now.getMonth(), now.getDate())});
                        $location.path('user');
                    }, function (res) {
                        $rootScope.me = false;
                    });
                }, function (res) {
                    $rootScope.me = false;
                });
            } else {
                $rootScope.me = false;
            }
        }]);
});