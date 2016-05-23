'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */


describe('signUp', function() {
    beforeEach(function () {
        browser.get('/index.html');
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('');
        });
    });
    it('utente deve poter registrarsi', function() {
        element(by.css('[href="#/signup"]')).click();
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/signup');
            element(by.id('userName')).sendKeys("testUser");
            element(by.id('fullName')).sendKeys("User di Test");
            element(by.id('password')).sendKeys("password");
            element(by.id('repeatPassword')).sendKeys("password");
            element(by.css('[type="submit"]')).click();
        //});
        //browser.getLocationAbsUrl().then(function(url) {
            element(by.css('[ng-click="logout()"]')).click();
        });
    });
    it('utente deve  deve poter loggarsi con proprio account', function() {
        element(by.css('[href="#/login"]')).click();
        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toEqual('/login');
            element(by.id('inputUsername')).sendKeys("testUser");
            element(by.id('inputPassword')).sendKeys("password");
            element(by.css('[type="submit"]')).click();
        //});
       // browser.getLocationAbsUrl().then(function (url) {
            element(by.css('[ng-click="logout()"]')).click();
        });
    });
});
