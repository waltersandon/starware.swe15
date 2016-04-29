$(function () {
    angular.module('app.App').controller('controller.public.LogIn', ['$cookies', 'model.data.CurrentUser', '$location', '$scope', '$rootScope', 'model.service.SessionService', 'model.service.UserService', function ($cookies, CurrentUser, $location, $scope, $rootScope, SessionService, UserService) {          
            $scope.submit = function () {
                SessionService.login($scope.password, $scope.userName, function () {
                    UserService.getMe(function (me) {
                        $rootScope.me = me;
                        $cookies.putObject('me', me);
                        $location.url('#/user');
                        console.log('getme');
                    }, function () {
                        console.log('no getme');
                    });
                }, function () {
                    
                });

            };
        }]);
});
