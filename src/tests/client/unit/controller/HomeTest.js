describe('controller.public.Home', function() {
    var $location, $rootScope,$cookies, $scope, SpyModelServiceSessionService, SpyModelServiceUserService;
    beforeEach(module('app.App'));
    beforeEach(module(function($provide) {
        SpyModelServiceUserService = function () {
            this.getMe = function () {
                return "sono mi";
            };
            
        };
        $provide.value("model.service.UserService'",SpyModelServiceUserService );

    }));
    beforeEach(inject(function (_$rootScope_, _$controller_, _$location_,_$scope_, _$cookies_ ) {
        $location = _$location_.$new();
        $scope = _$scope_.$new();
        $rootScope = _$rootScope_.$new();
        $cookies = _$cookies_.$new();

        createController = function() {
            return $controller('controller.public.Home', {
                '$scope': $scope,
                '$rootScope' : $rootScope,
                '$cookies' : $cookies
            });
        };
        
    }));

    it('should have a method to check if the path is active', function() {
        var controller = createController();
        $cookies.put('connect.sid', "id_sessione");
        controller.$scope.checkLogged();
        expect(controller.$scope.me).toBe('sono mi');
       // expect(scope.isActive('/about')).toBe(true);
       // expect(scope.isActive('/contact')).toBe(false);
    });
});