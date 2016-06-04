var expect = require('chai').expect;
var AnswerCheck = require('../../../../api/validator/AnswerCheck.js');

describe('AnswerCheck', function() {

    var check = new AnswerCheck();

    describe('checkScore', function() {

        it ('deve bloccare punteggi negativi', function() {
            expect(check.checkScore(-0.01)).to.equal(false);
            expect(check.checkScore(-0.1)).to.equal(false);
            expect(check.checkScore(-1)).to.equal(false);
        });

        it ('deve bloccare punteggi superiori a 1', function() {
            expect(check.checkScore(1.1)).to.equal(false);
            expect(check.checkScore(2.0)).to.equal(false);
            expect(check.checkScore(3)).to.equal(false);
        });

        it ('deve accettare 0', function() {
            expect(check.checkScore(0)).to.equal(true);
        });

        it ('deve accettare 1', function() {
            expect(check.checkScore(1)).to.equal(true);
        });

        it ('deve accettare numeri tra 0 e 1', function() {
            expect(check.checkScore(0.01)).to.equal(true);
            expect(check.checkScore(0.20)).to.equal(true);
            expect(check.checkScore(0.25)).to.equal(true);
            expect(check.checkScore(0.50)).to.equal(true);
            expect(check.checkScore(0.75)).to.equal(true);
            expect(check.checkScore(0.999)).to.equal(true);
        });

    });

});