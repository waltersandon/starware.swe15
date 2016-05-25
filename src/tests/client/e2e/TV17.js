'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('logout', function() {
    beforeEach(function () {
        browser.get('/index.html');
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('');
            element(by.css('[href="#/login"]')).click();
        });
    });
    it('studente deve poter  sloggarsi', function() {
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/login');
            element(by.id('inputUsername')).sendKeys("mario.rossi");
            element(by.id('inputPassword')).sendKeys("password.mario.rossi");
            element(by.css('[type="submit"]')).click();
        });
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/user');
            element(by.css('[ng-click="logout()"]')).click();
        });
    });
    it('docente deve poter sloggarsi', function() {
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/login');
            element(by.id('inputUsername')).sendKeys("tullio.vardanega");
            element(by.id('inputPassword')).sendKeys("password.tullio.vardanega");
            element(by.css('[type="submit"]')).click();
        });
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/user');
            element(by.css('[ng-click="logout()"]')).click();
        });
    });
    it('admin deve poter loggarsi', function() {
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/login');
            element(by.id('inputUsername')).sendKeys("francesco.ranzato");
            element(by.id('inputPassword')).sendKeys("password.francesco.ranzato");
            element(by.css('[type="submit"]')).click();
        });
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/user');
            element(by.css('[ng-click="logout()"]')).click();
        });
    });


});
