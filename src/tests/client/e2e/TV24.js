'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Execute Questionnaire Ospite', function() {
    beforeEach(function () {
        browser.get('/index.html');
    });
    afterEach(function () {
        browser.get('/index.html');
        //browser.switchTo().alert().accept();
    });

    it('ospite deve poter eseguire un questionario', function () {


        element(by.css('[ng-click="changePath(\'student/questionnaires\')"]')).click();
        element(by.id('titleSearch')).sendKeys("Quiz 1");
        //element(by.id('authorSearch')).sendKeys("Tullio Vardanega");
        element(by.id('tagSearch')).sendKeys("Matematica");
        element(by.css('[type="submit"]')).click();
        element.all(by.css('[ng-click="executeQuestionnaire(quest.id)"]')).first().click();

        element(by.css('[value="false"]')).click();
        element(by.css('[ng-click="getNext()"]')).click();



        element(by.css('[value="true"]')).click();
        element(by.css('[ng-click="getNext()"]')).click();

        element(by.css('[value="true"]')).click();
        element(by.css('[ng-click="getNext()"]')).click();

        browser.waitForAngular();
        element(by.css('[ng-click="submit()"]')).click();
        browser.switchTo().alert().accept();
        for(var i = 0; i < 3; i++){
            element(by.css('[ng-click="getNext()"]')).click();
        }
    });
});