/**
 * Created by igor on 22/04/16.
 * 162.TU
 */
var expect = require('chai').expect;
var testSubject = require('../../../api/validator/QuestionnaireCheck.js');
describe('Testing di QuestionnaireCheck', function() {
    var check = new testSubject();
    describe('test checkTitle()', function() {
        it('deve bloccare il titolo vuoto', function() {
            expect(check.checkTitle('')).to.equal(false);        });
        it('deve accettare  il titolo non vuoto', function() {
            expect(check.checkTitle("abc")).to.equal(true);        });

    });
    describe('test checkTags()', function() {
        it('deve bloccare la lista dei tag vuota', function() {
            var lista=[];
            expect(check.checkTags(lista)).to.equal(false);
        });
        it('deve accettare  la lista dei tag non vuota', function() {
            var lista= ["SWE","Informatica"];
            expect(check.checkTitle(lista)).to.equal(true);
        });

    });
    describe('test checkQuestions()', function() {
        it('deve bloccare  passata lista vuota', function() {
            var lista=[];
            expect(check.checkQuestions(lista)).to.equal(false);        });
        it('deve bloccare  passata lista con domande doppie', function() {
            var lista= ["SWE","SWE"];
            expect(check.checkTitle(lista)).to.equal(false);        });
        it('deve accettare passata lista corretta',function (){
            var lista= ["SWE","Informatica"];
            expect(check.checkTitle(lista)).to.equal(true);
        });

    });

});