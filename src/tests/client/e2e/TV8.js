'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Questionnaire Modify', function() {
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
            expect(url).toEqual('/teacher/questionnaires');
            element(by.css('[ng-click="logout()"]')).click();
        });
    });
    it('docente deve poter  modificare un proprio questionario', function() {

        element(by.css('[ng-click="changePath(\'teacher/questionnaires\')"]')).click();
        element(by.id("titleSearch")).clear().sendKeys("Questionnario Test");
        element(by.repeater("questionnaire in questionnaires")).click();
        element(by.id("title")).clear().sendKeys("Questionnario Test Dopo Modifica");
        element(by.id("tags")).clear().sendKeys("Informatica");
        element.all(by.css('[ng-click="removeQuestion(question)"]')).last().click();
        browser.switchTo().alert().accept();
        element(by.buttonText("Conferma")).click();
    });
});
