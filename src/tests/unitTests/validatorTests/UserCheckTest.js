/**
 * Created by igor on 21/04/16.
 * 161.TU
 */
var testSubject = require('../../../api/validator/UserCheck.js');
describe('Testing di UserCheck', function() {
    describe('check full name', function() {
        it('deve bloccare i full name di lungezza 1 carattere', function() {
           //TODO
        });
        it('deve accettare  i full name di lungezza   3 caratteri', function() {
            //TODO
        });

    });
    describe('check password', function() {
        it('deve bloccare  password di lungezza 7 caratteri', function() {
            //TODO
        });
        it('deve accettare password di lungezza 8 caratteri', function() {
            //TODO
        });
        it('deve bloccare password di lungezza 2 caratteri', function() {
            //TODO
        });
    });
    describe('check unique username', function() {
        it('deve bloccare username gia presente', function() {
            //TODO
        });
        it('deve accettare username non presente', function() {
            //TODO
        });
    });
    describe('check username', function() {
        it('deve accettare username di lungezza 6 caratteri', function() {
            //TODO
        });
        it('deve accettare username di lungezza 12 caratteri', function() {
            //TODO
        });
        it('deve bloccare username di lungezza 5 caratteri', function() {
            //TODO
        });
    });

});