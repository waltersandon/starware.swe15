'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Questionnaire Creation', function() {
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
    it('docente deve poter creare una nuovo questionario', function() {

        element(by.css('[ng-click="changePath(\'teacher/questionnaires\')"]')).click();
        element(by.css('[href="#/teacher/questionnaires/new/"]')).click();
        element(by.id('title')).clear().sendKeys("Questionnario Test");
        element(by.id('tags')).clear().sendKeys("Matematica, Informatica");
        element(by.css('[ng-click="setOnSelect(true)"]')).click();
        element(by.id('authorSearch')).clear().sendKeys("Tullio Vardanega");
        element(by.id('tagSearch')).clear().sendKeys("Matematica");
        element(by.buttonText('Cerca')).click();
        element.all(by.css('[ng-click="addQuestion(question)"]')).first().click();
        element(by.css('[ng-click="setOnSelect(true)"]')).click();
        element(by.id('authorSearch')).clear().sendKeys("Tullio Vardanega");
        element(by.id('tagSearch')).clear().sendKeys("Informatica");
        element(by.css('[ng-submit="submit()"]')).submit();
        element.all(by.css('[ng-click="addQuestion(question)"]')).last().click();
        element(by.buttonText('Conferma')).click();
    });
});
