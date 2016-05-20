'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */
/* codice per rallentare il test
var origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function() {
    var args = arguments;

    // queue 100ms wait
    origFn.call(browser.driver.controlFlow(), function() {
        return protractor.promise.delayed(200);
    });

    return origFn.apply(browser.driver.controlFlow(), args);
};
*/
describe('Admin UserList', function() {
    beforeEach(function () {
        browser.get('/index.html');
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('');
            element(by.css('[href="#/login"]')).click();
        });
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/login');
            element(by.id('inputUsername')).sendKeys("francesco.ranzato");
            element(by.id('inputPassword')).sendKeys("password.francesco.ranzato");
            element(by.css('[type="submit"]')).click();
        });
    });
    it('docente deve poter creare una nuovo questionario', function() {
        element(by.css('[href="#/admin/userlist"]')).click();
        var select = element.all(by.model('user.role')).last().click();
        select.$$('[ng-repeat="role in roles| filter : filterRoleList()"]').first().click();
        var deleteUser = element.all(by.css('[ng-click="deleteUser(user)"]')).last().click();
        browser.switchTo().alert().accept();
        element(by.css('[ng-click="logout()"]')).click();
    });
});
