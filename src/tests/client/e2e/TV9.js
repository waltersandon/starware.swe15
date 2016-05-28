'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Questionnaire Delete', function() {
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
    it('docente deve poter  eliminare un proprio questionario', function() {

        element(by.css('[ href="#/teacher/questionnaires"]')).click();
        element(by.id("titleSearch")).clear().sendKeys("Questionnario Test");
        element(by.css('[ng-click="remove(questionnaire)"]')).click();
        browser.switchTo().alert().accept();
    });
});