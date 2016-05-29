'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Admin userlist', function() {
    beforeEach(function () {
        browser.get('/index.html');
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('');
            element(by.id('login')).click();
        });
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/login');
            element(by.id('inputUsername')).sendKeys("francesco.ranzato");
            element(by.id('inputPassword')).sendKeys("password.francesco.ranzato");
            element(by.css('[type="submit"]')).click();
        });
    });
    afterEach(function () {
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/admin/userlist');
            element(by.css('[ng-click="logout()"]')).click();
        });
    });
    it('admin sia in grado di visualizzare la lista degli utenti,' +
        ' eventualmente specificando parametri per il filtraggio del risultati ', function() {
        element(by.css('[href="#/admin/userlist"]')).click();
        var userList = element.all(by.repeater("user in usersList"));
        expect(userList.count()).toBeGreaterThan(0);
        //TODO
    });
});
