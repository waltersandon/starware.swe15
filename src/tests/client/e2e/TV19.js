'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('tag list', function() {
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
            expect(url).toEqual('/teacher/tags');
            element(by.css('[ng-click="logout()"]')).click();
        });
    });
    it('docente sia in grado di visualizzare la lista degli argomenti,' +
        ' eventualmente specificando parametri per il filtraggio del risultati', function() {
        element(by.css('[ng-click="changePath(\'teacher/tags\')"]')).click();
        var tagList = element.all(by.repeater("tag in tags"));
        expect(tagList.count()).toBeGreaterThan(0);

    });
});
