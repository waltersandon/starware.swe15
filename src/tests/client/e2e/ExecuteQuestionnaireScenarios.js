'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Execute Questionnaire', function() {
    beforeEach(function () {
        browser.get('#/login');
        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toEqual('/login');
            element(by.id('inputUsername')).sendKeys("mario.rossi");
            element(by.id('inputPassword')).sendKeys("password.mario.rossi");
            element(by.buttonText('Submit')).click();
        });
    });

    it('studente deve poter eseguire un questionario', function () {


        element(by.linkText('Questionari')).click();
        element(by.id('titleSearch')).sendKeys("Quiz 1");
        element(by.id('authorSearch')).sendKeys("Tullio Vardanega");
        element(by.id('tagSearch')).sendKeys("Matematica");
        element(by.buttonText('Cerca')).click();
        element.all(by.css('[ng-click="executeQuestionnaire(quest.id)"]')).first().click();
        for(var i = 0; i < 3; i++){
            element(by.css('[value="true"]')).click();
            element(by.buttonText('Successiva')).click();
        }
        element(by.buttonText('Correggi')).click();
        browser.switchTo().alert().accept();
        element(by.css('[ng-click="logout()"]')).click();
    });
});