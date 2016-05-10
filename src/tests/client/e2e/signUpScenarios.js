'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('login', function() {

    it('utente deve poter registrarsi', function() {
        browser.get('#/signup');
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/signup');
            element(by.id('userName')).sendKeys("testUser");
            element(by.id('fullName')).sendKeys("User di Test");
            element(by.id('password')).sendKeys("password");
            element(by.id('repeatPassword')).sendKeys("password");
            element(by.buttonText('Submit')).click();
        });
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/user');
            element(by.css('[ng-click="logout()"]')).click();
        });
    });
    it('utente deve  deve poter loggarsi con proprio account', function() {
        browser.get('#/login');
        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toEqual('/login');
            element(by.id('inputUsername')).sendKeys("testUser");
            element(by.id('inputPassword')).sendKeys("password");
            element(by.buttonText('Submit')).click();
        });
        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toEqual('/user');
            element(by.css('[ng-click="logout()"]')).click();
        });
    });
});
