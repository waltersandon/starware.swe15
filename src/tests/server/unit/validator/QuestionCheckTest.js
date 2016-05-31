var expect = require('chai').expect;
var testSubject = require('../../../../api/validator/QuestionCheck.js');
describe('Testing di QuestionCheck', function() {
    var check = new testSubject();
    describe('check QML', function() {
        it('deve bloccare QML MC senza risposta giusta', function() {
            expect(check.checkQML("domanda?\n()Opzione")).to.equal(false);
        });
        it('deve bloccare QML MC senza risposte', function() {
            expect(check.checkQML("domanda?")).to.equal(false);
        });
        it('deve bloccare QML MC con due risposte giuste', function() {
            expect(check.checkQML("domanda?\n(*)OpzioneGiusta\n(*)OpzioneGiusta")).to.equal(false);
        });
        it('deve accettare QML come corpo della domanda', function() {
            expect(check.checkQML("Questo QML è giusto [*] Roma è la capitale d’**Italia**?\n(+)")).to.equal(true);
        });
        it('deve accettare  QML per domanda vero/falso', function() {
            expect(check.checkQML("Roma è la capitale d’**Italia**?\n(+)")).to.equal(true);

        });
        it('deve accettare  QML per domanda a risposta multipla', function() {
            expect(check.checkQML("Domanda\n()Opzione \n()Opzione\n(*)OpzioneGiusta \n()Opzione")).to.equal(true);
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