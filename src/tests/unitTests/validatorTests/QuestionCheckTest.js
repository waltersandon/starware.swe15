/**
 * Created by igor on 22/04/16.
 * 164.TU
 */
var expect = require('chai').expect;
var testSubject = require('../../../api/validator/QuestionCheck.js');
describe('Testing di QuestionCheck', function() {
    var check = new testSubject();
    describe('check QML', function() {
        it('deve bloccare QML errato', function() {
            //TODO
        });
        it('deve bloccare QML di domande innestate', function() {
            //TODO
        });
        it('deve accettare  QML per domanda vero/falso', function() {
            expect(check.checkQML("<TF>Roma è la capitale d’**Italia**?\n[T]")).to.equal(true);

        });
        it('deve accettare  QML per domanda a risposta multipla', function() {
            expect(check.checkQML("<MultipleChoice>Qual \n[]Padova \n[]Padova\n[*]Roma")).to.equal(true);
        });

    });
});
/*
 <TF>
 Roma è la capitale d’**Italia**?
 [T]

 <MultipleChoice>
 Qual’è la capitale d’Italia? Qui posso mettere []
 []Padova
 []Venezia
 [*]Roma
 []Napoli
 */