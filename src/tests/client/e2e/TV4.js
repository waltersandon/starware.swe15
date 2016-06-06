'use strict';


/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Question Creation', function() {
    beforeEach(function () {
        browser.get('/index.html');
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('');
            element(by.id('login')).click();
        });
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/login');
            element(by.id('inputUsername')).sendKeys("tullio.vardanega");
            element(by.id('inputPassword')).sendKeys("password.tullio.vardanega");
            element(by.css('[type="submit"]')).click();
        });
    });
    afterEach(function () {
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/teacher/questions');
            element(by.css('[ng-click="logout()"]')).click();
        });
    });
    it('docente deve poter creare una domanda', function() {

        element(by.css('[ng-click="changePath(\'teacher/questions\')"]')).click();
        element(by.css('[href="#/teacher/questions/new/"]')).click();
        browser.waitForAngular();
        browser.executeScript('$("div.CodeMirror-wrap > div").removeAttr("style");');
        var textareas = browser.findElement(by.css('[autocorrect="off"]'));
        element(by.id('tags')).sendKeys("Matematica");
        browser.waitForAngular();
        textareas.sendKeys(
            protractor.Key.CONTROL, "a", protractor.Key.NULL,
            "2+2=5?\n(-)");
        element(by.css('[type="submit"]')).click();
        browser.waitForAngular();
    });
});
