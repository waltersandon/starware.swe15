/**
 * Created by igor on 22/04/16.
 * 163.TU
 */
var expect = require('chai').expect;
var testSubject = require('../../../../api/validator/TagCheck.js');
describe('Testing di TagCheck', function() {
    var check = new testSubject();
    describe('test checkName()', function() {
        it('deve bloccare name vuoto', function() {
            expect(check.checkName("")).to.equal(false);
        });
        it('deve accettare  name non vuoto', function() {
            expect(check.checkName("ciao")).to.equal(true);
        });

    });
});