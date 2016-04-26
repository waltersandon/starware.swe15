/**
 * Created by igor on 21/04/16.
 * 161.TU
 */
var expect = require('chai').expect;
var testSubject = require('../../../api/validator/UserCheck.js');
describe('Testing di UserCheck', function() {
    var check = new testSubject();
    describe('check full name', function() {
        it('deve bloccare i full name di lungezza 1 carattere', function() {
            expect(check.checkFullName("a")).to.equal(false);
        });
        it('deve accettare  i full name di lungezza   3 caratteri', function() {
            expect(check.checkFullName("abc")).to.equal(true);
        });

    });
    describe('check password', function() {
        it('deve bloccare  password di lungezza 7 caratteri', function() {
            expect(check.checkPassword("1234567")).to.equal(false);
        });
        it('deve accettare password di lungezza 8 caratteri', function() {
            expect(check.checkPassword("12345678")).to.equal(true);
        });
        it('deve bloccare password di lungezza 2 caratteri', function() {
            expect(check.checkPassword("12")).to.equal(false);
        });
    });

    describe('check unique username', function() {
        it('deve bloccare username gia presente', function() {
            expect(check.checkUniqueUserName()("mrossi")).to.equal(false);
        });
        it('deve accettare username non presente', function() {
            expect(check.checkUniqueUserName()("ciao")).to.equal(true);        });
    });
    describe('check username', function() {
        it('deve accettare username di lungezza 6 caratteri', function() {
            var check = new testSubject();
            expect(check.checkUserName("123456")).to.equal(true);
        });
        it('deve accettare username di lungezza 12 caratteri', function() {
            expect(check.checkUserName("1234567890ab")).to.equal(true);
        });
        it('deve bloccare username di lungezza 5 caratteri', function() {
            expect(check.checkUserName("12345")).to.equal(false);
        });
    });

});