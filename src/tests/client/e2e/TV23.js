'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Questionnaire inspection', function() {
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
    it('docente sia in grado di visualizzare un questionario', function() {

        element(by.css('[ href="#/teacher/questionnaires"]')).click();
        var questionnaireList = element.all(by.repeater("questionnaire in questionnaires"));
        questionnaireList.first().click();

        var title = element(by.id("title"));
        expect(title.getText()).toBeDefined();

        var tags = element(by.id("tags"));
        expect(tags.getText()).toBeDefined();

        var questions = element.all(by.repeater("question in questionnaire.questions"));
        expect(questions.count()).toBeGreaterThan(0);

        element(by.buttonText('Conferma')).click();
    });
});
