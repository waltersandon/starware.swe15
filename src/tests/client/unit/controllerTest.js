'use strict';

/* jasmine specs for controllers go here */
describe('PhoneCat controllers', function() {

    beforeEach(function () {
        this.addMatchers({
            toEqualData: function (expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

    beforeEach(module('app.App'));

    describe('Questionnaires controller test', function () {
        var scope, ctrl, $httpBackend;

        beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('phones/phones.json').respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);

            scope = $rootScope.$new();
            ctrl = $controller('PhoneListCtrl', {$scope: scope});
        }));


        it('should create "phones" model with 2 phones fetched from xhr', function () {
            expect(scope.phones).toEqualData([]);
            $httpBackend.flush();

            expect(scope.phones).toEqualData(
                [{name: 'Nexus S'}, {name: 'Motorola DROID'}]);
        });


        it('should set the default value of orderProp model', function () {
            expect(scope.orderProp).toBe('age');
        });
    });
});