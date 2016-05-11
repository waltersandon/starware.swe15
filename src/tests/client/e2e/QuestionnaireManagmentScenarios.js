'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('QuestionnaireCreation', function() {
    beforeEach(function () {
        browser.get('#/login');
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/login');
            element(by.id('inputUsername')).sendKeys("tullio.vardanega");
            element(by.id('inputPassword')).sendKeys("password.tullio.vardanega");
            element(by.buttonText('Submit')).click();
        });
    });
    it('docente deve poter creare una nuovo questionario', function() {

        element(by.linkText('Gestisci questionari')).click();
        element(by.css('[href="#/teacher/questionnaires/new/"]')).click();
        element(by.id('title')).sendKeys("Questionnario Test");
        element(by.id('tags')).sendKeys("Matematica");
        element(by.css('[ng-click="setOnSelect(true)"]')).click();
        element(by.id('tagSearch')).sendKeys("Matematica");
        element(by.buttonText('Cerca')).click();
        element.all(by.css('[ng-click="addQuestion(question)"]')).first().click();
        element(by.css('[ng-click="setOnSelect(true)"]')).click();
        element(by.id('tagSearch')).sendKeys("Matematica");
        element(by.buttonText('Cerca')).click();
        element.all(by.css('[ng-click="addQuestion(question)"]')).last().click();
        element(by.buttonText('Submit')).click();
        element(by.css('[ng-click="logout()"]')).click();
    });
});
