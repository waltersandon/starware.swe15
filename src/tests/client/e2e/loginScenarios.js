'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('login', function() {

    it('studente deve poter loggarsi', function() {
        browser.get('#/login');
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/login');
            element(by.id('inputUsername')).sendKeys("mrossi");
            element(by.id('inputPassword')).sendKeys("password");
            element(by.buttonText('Submit')).click();
        });
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/user');
            element(by.className('glyphicon-off')).click();
        });
    });
    it('docente deve poter loggarsi', function() {
        browser.get('#/login');
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/login');
            element(by.id('inputUsername')).sendKeys("cbianchi");
            element(by.id('inputPassword')).sendKeys("password");
            element(by.buttonText('Submit')).click();
        });
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/user');
            element(by.className('glyphicon-off')).click();
        });
    });
    it('admin deve poter loggarsi', function() {
        browser.get('#/login');
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/login');
            element(by.id('inputUsername')).sendKeys("averdi");
            element(by.id('inputPassword')).sendKeys("password");
            element(by.buttonText('Submit')).click();
        });
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/user');
            element(by.className('glyphicon-off')).click();
        });
    });


});
