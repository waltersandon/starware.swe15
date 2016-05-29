'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('change password', function() {
    beforeEach(function () {
        browser.get('/index.html');
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('');
            element(by.id('login')).click();
        });
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/login');
            element(by.id('inputUsername')).sendKeys("cbianchi");
            element(by.id('inputPassword')).sendKeys("password.carlo.bianchi");
            element(by.css('[type="submit"]')).click();
        });
    });
    afterEach(function () {
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/user/user');
            element(by.css('[ng-click="logout()"]')).click();
        });
    });
    it('utente sia in grado di modificare la propria password', function() {
        element(by.id('profile')).click();
        element(by.id('oldPassword')).clear().sendKeys("password.carlo.bianchi");
        element(by.id('newPassword')).clear().sendKeys("password.dopo.test");
        element(by.id('repeatPassword')).clear().sendKeys("password.dopo.test");
        var form = element(by.css('[ng-submit="checkPassword() && checkRepeatPassword() && submitPassword()"]'));
        form.submit();
    });

});
