var expect = require('chai').expect;
var testSubject = require('../../../../api/validator/QuestionCheck.js');
describe('QuestionCheck', function() {
    var check = new testSubject();
    describe('checkQML', function() {

        /* General */
        it ('deve bloccare QML senza risposte', function() {
            expect(check.checkQML("domanda?\nseconda linea")).to.equal(false);
        });

        it('deve accettare QML come corpo della domanda', function() {
            expect(check.checkQML("Questo QML è giusto [*] Roma è la capitale d’**Italia**?\n(+)")).to.equal(true);
        });

        it('deve accettare QML con escape', function() {
            expect(check.checkQML("Questo QML è giusto\n \\[*]\nRoma è la capitale d’**Italia**?\n(+)")).to.equal(true);
        });

        /* Multiple choice */
        it('deve accettare QML MC corretto', function() {
            expect(check.checkQML("domanda?\n()Opzione \n(*) Giusta \n() Sbagliata")).to.equal(true);
        });

        it('deve bloccare QML MC senza risposta giusta', function() {
            expect(check.checkQML("domanda?\n()Opzione")).to.equal(false);
        });

        it('deve bloccare QML MC senza risposte sbagliate', function() {
            expect(check.checkQML("domanda?\n(*)Opzione")).to.equal(false);
        });

        it('deve bloccare QML MC con due risposte giuste', function() {
            expect(check.checkQML("domanda?\n(*)OpzioneGiusta\n(*)OpzioneGiusta")).to.equal(false);
        });

        /* Multiple answer */
        it('deve accettare QML MA corretta', function() {
            expect(check.checkQML("Domanda\n[]Opzione \n[]Opzione\n[*]OpzioneGiusta \n[]Opzione")).to.equal(true);
        });

        it('deve accettare QML MA con due risposte giuste', function() {
            expect(check.checkQML("domanda?\n[*]OpzioneGiusta\n[*]OpzioneGiusta\n[] Sbagliata")).to.equal(true);
        });

        it('deve bloccare QML MA senza risposta giusta', function() {
            expect(check.checkQML("domanda?\n[]Opzione\n[] Opzione 2")).to.equal(false);
        });

        it('deve bloccare QML MA senza risposta sbagliata', function() {
            expect(check.checkQML("domanda?\n[*]OpzioneGiusta\n[*]OpzioneGiusta")).to.equal(false);
        });

        /* True false */
        it('deve accettare  QML TF corretto', function() {
            expect(check.checkQML("Roma è la capitale d’**Italia**?\n(+)")).to.equal(true);
            expect(check.checkQML("Roma è la capitale d’**Italia**?\n(-)")).to.equal(true);
        });

    });
    describe('checkTags', function () {
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