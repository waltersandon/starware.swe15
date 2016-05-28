'use strict';


/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Question Modify', function() {
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
           // browser.switchTo().alert().accept();
        });
    });
    it('docente deve poter modificare una domanda', function() {

        element(by.css('[href="#/teacher/questions"]')).click();
        element.all(by.css('[ng-click="modify(question)"]')).last().click();
        browser.waitForAngular();
        browser.executeScript('$("div.CodeMirror-wrap > div").removeAttr("style");');
        var textareas = browser.findElement(by.css('[autocorrect="off"]'));
        element(by.id('tags')).clear().sendKeys("Geografia");
        textareas.sendKeys("");
        for(var i = 0; i < 14; i++){
            browser.actions().sendKeys(protractor.Key.DELETE).perform();

        }
        textareas.sendKeys("<TF T>\nRoma è la capitale d'Italia");
        element(by.css('[type="submit"]')).click();
        browser.waitForAngular();
    });


});
