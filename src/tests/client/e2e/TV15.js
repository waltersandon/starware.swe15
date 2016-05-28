'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('change profile', function() {
    beforeEach(function () {
        browser.get('/index.html');
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('');
            element(by.id('login')).click();
        });
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/login');
            element(by.id('inputUsername')).sendKeys("carlo.bianchi");
            element(by.id('inputPassword')).sendKeys("password.carlo.bianchi");
            element(by.css('[type="submit"]')).click();
        });
    });
    afterEach(function () {
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/user/user');
            element(by.css('[ng-click="logout()"]')).click();
        });
    });
    it('utente sia in grado di aggiornare i propri dati personali ', function() {
        element(by.id('profile')).click();
        element(by.id('userName')).clear().sendKeys("cbianchi");
        element(by.id('fullname')).clear().sendKeys("Carlo Leone Bianchi");
        var form = element(by.css('[ng-submit="checkUserName() && checkFullName() && submitInformation()"]')); 
        form.submit();
    });

});
