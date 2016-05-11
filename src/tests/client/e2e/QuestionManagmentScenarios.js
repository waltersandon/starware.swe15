'use strict';


/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('QuestionCreation', function() {
    beforeEach(function () {
        browser.get('#/login');
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/login');
            element(by.id('inputUsername')).sendKeys("tullio.vardanega");
            element(by.id('inputPassword')).sendKeys("password.tullio.vardanega");
            element(by.buttonText('Submit')).click();
        });
    });
    it('docente deve poter creare una domanda', function() {

        element(by.linkText('Gestisci domande')).click();
        element(by.css('[href="#/teacher/questions/new/"]')).click();
        browser.waitForAngular();
        browser.executeScript('$("div.CodeMirror-wrap > div").removeAttr("style");');
        var textareas = browser.findElement(by.css('[autocorrect="off"]'));
        element(by.id('tags')).sendKeys("Matematica");
        browser.waitForAngular();
        textareas.sendKeys(
            protractor.Key.CONTROL, "a", protractor.Key.NULL,
            "<TF F> 2+2=5");
        element(by.buttonText('Submit')).click();
        element(by.css('[ng-click="logout()"]')).click();
    });
    it('docente deve poter modificare una domanda', function() {

            element(by.linkText('Gestisci domande')).click();
            element(by.css('[ng-click="modify(question)"]')).click();
            browser.waitForAngular();
            browser.executeScript('$("div.CodeMirror-wrap > div").removeAttr("style");');
            var textareas = browser.findElement(by.css('[autocorrect="off"]'));
                element(by.id('tags')).sendKeys("Matematica");
                browser.waitForAngular();
                textareas.sendKeys(
                    protractor.Key.CONTROL, "a", protractor.Key.NULL,
                    "<TF F> hai mofificato");
        element(by.buttonText('Submit')).click();
        element(by.css('[ng-click="logout()"]')).click();
    });


});
