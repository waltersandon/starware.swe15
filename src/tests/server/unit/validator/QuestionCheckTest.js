var expect = require('chai').expect;
var testSubject = require('../../../../api/validator/QuestionCheck.js');
describe('Testing di QuestionCheck', function() {
    var check = new testSubject();
    describe('check QML', function() {
        it('deve bloccare QML TF senza risposta', function() {
            expect(check.checkQML("<TF> domanda?")).to.equal(false);
        });
        it('deve bloccare QML MultipleChoice senza risposta giusta', function() {
            expect(check.checkQML("<MultipleChoice> domanda? \n[answers]\n[]Opzione")).to.equal(false);
        });
        it('deve bloccare QML MultipleChoice senza risposte', function() {
            expect(check.checkQML("<MultipleChoice> domanda?")).to.equal(false);
        });
        it('deve bloccare QML MultipleChoice con due risposte giuste', function() {
            expect(check.checkQML("<MultipleChoice> domanda?\n[answers]\n[*]OpzioneGiusta\n[*]OpzioneGiusta")).to.equal(false);
        });
        it('deve accettare QML  come corpo della domanda', function() {
            expect(check.checkQML("<TF T> Questo QML è giusto <TF>Roma è la capitale d’**Italia**? <TF t>?")).to.equal(true);
        });
        it('deve accettare  QML per domanda vero/falso', function() {
            expect(check.checkQML("<TF T>Roma è la capitale d’**Italia**?")).to.equal(true);

        });
        it('deve accettare  QML per domanda a risposta multipla', function() {
            expect(check.checkQML("<MultipleChoice>Domanda\n[answers]\n[]Opzione \n[]Opzione\n[*]OpzioneGiusta \n[]Opzione")).to.equal(true);
        });

    });
    describe('check tags della domanda', function () {
        it('deve bloccare domande con la lista dei tag vuote',function () {
         var lista=[];
            expect(check.checkTags(lista)).to.equal(false);
        });
        it('deve bloccare domande con la lista dei tag duplicati',function () {
            var lista=["SWE","SWE"];
            expect(check.checkTags(lista)).to.equal(false);
        });
        it('deve accettare domande con la lista dei tag distinti',function () {
            var lista=["SWE","Informatica"];
            expect(check.checkTags(lista)).to.equal(true);
        });
    });
});