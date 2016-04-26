/**
 * Created by igor on 22/04/16.
 * 163.TU
 */
var expect = require('chai').expect;
var testSubject = require('../../../api/validator/TagCheck.js');
describe('Testing di TagCheck', function() {
    var check = new testSubject();
    describe('test checkName()', function() {
        it('deve bloccare name presente nel db', function() {
            expect(check.checkName("SWE")).to.equal(false);
        });
        it('deve accettare  name non presente nel db', function() {
            expect(check.checkName("ciao")).to.equal(true);
        });

    });
});