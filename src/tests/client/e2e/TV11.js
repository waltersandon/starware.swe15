'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('TagModify', function() {
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
    it('docente deve poter modificare un argomento', function() {
        element(by.css('[href="#/teacher/tags"]')).click();
        var tag = element.all(by.css('[ng-repeat="tag in tags| orderBy : myOrderBy"]')).last();
        var tagName = tag.$$('[ng-model="tag.name"]').first().clear();
        var tagDescription = tag.$$('[ng-model="tag.description"]').first().clear();
        var tagModify = tag.$$('[ng-click="modify(tag)"]').first();

        tagName.sendKeys("Argomento dopo modify");
        tagDescription.sendKeys("Questo argomento è stato cambiato con test automatico");
        tagModify.click();
    });
});
