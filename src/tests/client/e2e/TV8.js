'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('QuestionnaireCreation', function() {
    beforeEach(function () {
        browser.get('/index.html');
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('');
            element(by.css('[href="#/login"]')).click();
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

        element(by.css('[ href="#/teacher/questionnaires"]')).click();
        //TODO
    });
});
