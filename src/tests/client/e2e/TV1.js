'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

/* codice per rallentare il test
 var origFn = browser.driver.controlFlow().execute;

 browser.driver.controlFlow().execute = function() {
 var args = arguments;

 // queue 100ms wait
 origFn.call(browser.driver.controlFlow(), function() {
 return protractor.promise.delayed(200);
 });

 return origFn.apply(browser.driver.controlFlow(), args);
 };
 */

describe('signUp', function() {
    beforeEach(function () {
        browser.get('/index.html');
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('');
        });
    });
    afterEach(function () {
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/user');
            element(by.css('[ng-click="logout()"]')).click();
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
        });
    });
    it('utente deve  deve poter loggarsi con proprio account', function() {
        element(by.css('[href="#/login"]')).click();
        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toEqual('/login');
            element(by.id('inputUsername')).sendKeys("testUser");
            element(by.id('inputPassword')).sendKeys("password");
            element(by.css('[type="submit"]')).click();
        });
    });
});
