'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('TagDelete', function() {
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
    it('docente deve poter eliminare un  argomento', function() {
        element(by.css('[ng-click="changePath(\'teacher/tags\')"]')).click();
        var tag = element.all(by.css('[ng-repeat="tag in tags| orderBy : myOrderBy"]')).last();
        tag.$$('[ng-click="remove(tag)"]').first().click();
        browser.switchTo().alert().accept();
    });
});
