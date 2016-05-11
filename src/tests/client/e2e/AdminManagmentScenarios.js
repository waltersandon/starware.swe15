'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Admin UserList', function() {
    beforeEach(function () {
        browser.get('#/login');
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/login');
            element(by.id('inputUsername')).sendKeys("francesco.ranzato");
            element(by.id('inputPassword')).sendKeys("password.francesco.ranzato");
            element(by.css('[type="submit"]')).click();
        });
    });
    it('docente deve poter creare una nuovo questionario', function() {
        element(by.css('[href="#/admin/userlist"]')).click();
        var select = element.all(by.model('user.role')).last().click();
        select.$$('[ng-repeat="role in roles| filter : filterRoleList()"]').first().click();
        var deleteUser = element.all(by.css('[ng-click="deleteUser(user)"]')).last().click();
        browser.switchTo().alert().accept();
        element(by.css('[ng-click="logout()"]')).click();
    });
});
