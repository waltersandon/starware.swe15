'use strict';


/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Question inspection', function() {
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
        });
    });
    it('docente sia in grado di visualizzare una domanda ', function() {

        element(by.css('[ng-click="changePath(\'teacher/questions\')"]')).click();
        var questionList = element.all(by.repeater("question in questions"));
        questionList.first().click();
        var tags = element(by.id("tags"));
        expect(tags.getText()).toBeDefined();
        element(by.buttonText('Conferma')).click();
    });
});
