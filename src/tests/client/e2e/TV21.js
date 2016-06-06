'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe(' Questionnaires list', function() {
    beforeEach(function () {
        browser.get('/index.html');
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('');
            element(by.id('login')).click();
        });
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/login');
            element(by.id('inputUsername')).sendKeys("mario.rossi");
            element(by.id('inputPassword')).sendKeys("password.mario.rossi");
            element(by.css('[type="submit"]')).click();
        });
    });
    afterEach(function () {
        element(by.css('[ng-click="logout()"]')).click();
    });

    it('utente sia in grado di visualizzare la lista dei questionari,' +
        ' eventualmente specificando parametri per il filtraggio del risultati', function () {


        element(by.css('[ng-click="changePath(\'student/questionnaires\')"]')).click();
        element(by.buttonText("Cerca")).click();
        var questionnaireList = element.all(by.repeater("quest in questList"));
        expect(questionnaireList.count()).toBeGreaterThan(0);
    });
});