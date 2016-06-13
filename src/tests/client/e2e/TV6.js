'use strict';


/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Question Delete', function() {
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
            //browser.switchTo().alert().accept();
        });
    });
    it('docente deve poter cancellare una domanda non usata in nessun questionario', function() {
        
        element(by.css('[ng-click="changePath(\'teacher/questions\')"]')).click();
        element(by.id("bodySearch")).clear().sendKeys("Roma");
        browser.sleep(100);
        element(by.css('[ng-click="remove(question)"]')).click();
        browser.switchTo().alert().accept();
        browser.sleep(100);
    });


});
