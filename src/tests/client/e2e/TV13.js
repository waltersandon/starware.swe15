'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Admin delete user', function() {
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
    it('admin deve poter eliminare un utente  di ruolo inferiore al proprio ', function() {
        element(by.css('[ng-click="changePath(\'admin/userlist\')"]')).click();
        var deleteUser = element.all(by.css('[ng-click="deleteUser(user)"]')).last().click();
        browser.switchTo().alert().accept();
    });
});
