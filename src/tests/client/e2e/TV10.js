'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('TagCreation', function() {
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
    it('docente deve poter creare un nuovo argomento', function() {
        element(by.css('[ng-click="changePath(\'teacher/tags\')"]')).click();

        element(by.css('[ng-model="newName"]')).clear().sendKeys("Argomento di Test");

        element(by.css('[ng-model="newDescription"]')).clear().sendKeys("Questo argomento è stato" +
            " creato tramite test automatico");

        element(by.css('[ng-click="add()"]')).click();
    });
});
