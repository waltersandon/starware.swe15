/**
 * Created by igor on 22/04/16.
 * 162.TU
 */
var testSubject = require('../../../api/validator/QuestionnaireCheck.js');
describe('Testing di QuestionnaireCheck', function() {
    describe('test checkTitle()', function() {
        it('deve bloccare i full name di lungezza 1 carattere', function() {
            //TODO
        });
        it('deve accettare  i full name di lungezza   3 caratteri', function() {
            //TODO
        });

    });
    describe('test checkQuestions()', function() {
        it('deve bloccare  passata lista vuota', function() {
            //TODO
        });
        it('deve bloccare  passata lista con domande doppie', function() {
            //TODO
        });
        it('deve accettare passata lista corretta',function (){

        });

    });

});