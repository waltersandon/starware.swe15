'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Admin change role', function() {
    beforeEach(function () {
        browser.get('/index.html');
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('');
            element(by.id('login')).click();
        });
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/login');
            element(by.id('inputUsername')).sendKeys("francesco.ranzato");
            element(by.id('inputPassword')).sendKeys("password.francesco.ranzato");
            element(by.css('[type="submit"]')).click();
        });
    });
    afterEach(function () {
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/admin/userlist');
            element(by.css('[ng-click="logout()"]')).click();
        });
    });
    it('admin deve poter cambiare il ruolo di un utente di ruolo inferiore al proprio ', function() {
        element(by.css('[href="#/admin/userlist"]')).click();
        var select = element.all(by.model('user.role')).last().click();
        select.$$('[ng-repeat="role in roles| filter : filterRoleList()"]').first().click();
    });
});
