/**
 * Created by igor on 22/04/16.
 * 20.TU
 */
var expect = require('chai').expect;
var testSubject = require('../../../api/middleware/Loader.js');
var App = require('./../../../api/app/App');
var Authorization = require('./../../../api/middleware/Authorization');
var Router = require('./../../../api/middleware/Router');
var ErrorHandler = require('./../../../api/middleware/ErrorHandler');
var Configuration = require('../../../api/app/Configuration');
describe('Loader check', function() {


    var app = new App(new Configuration({
        test: true
    }));
        var a = new App();
        var check = new testSubject(app.config());
        it('deve creare ogetto Authorization', function() {
                expect(check.authorization).to.be.an.instanceof(Authorization);
        });
        it('deve creare ogetto ErrorHandler', function() {
                expect(check.error).to.be.an.instanceof(ErrorHandler);
        });
        it('deve creare ogetto Router', function() {
                expect(check.router).to.be.an.instanceof(Router);
         });
});