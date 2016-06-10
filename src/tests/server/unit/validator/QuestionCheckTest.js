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

        it ('deve accettare QML con spiegazioni', function() {
            expect(check.checkQML("Roma è la capitale d’**Italia**?\n(+)\n\"\"\"\nSpiegazione")).to.equal(true);
        });

        it ('deve ignorare sintassi QML nella spiegazione', function() {
            expect(check.checkQML("Domanda?\n[*] Risposta A \n [] Risposta B\n\"\"\"\nSpiegazione\n(+)")).to.equal(true);
            expect(check.checkQML("Domanda?\n[*] Risposta A \n [] Risposta B\nSpiegazione\n(+)")).to.equal(false);
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

        /* Order Items */
        it('deve accettare QML OI corretto', function() {
            expect(check.checkQML(
            "Riordina le seguenti serie TV in ordine cronologico in base alla data del loro primo episodio:\n" +
            "[Lost|Breaking Bad|Game of Thrones]")).to.equal(true);
        });

        it('deve bloccare QML OI con una singola opzione', function() {
            expect(check.checkQML(
                "Riordina le seguenti serie TV in ordine cronologico in base alla data del loro primo episodio:\n" +
                "[Lost]")).to.equal(false);
        });

        /* Couple Items */
        it('deve accettare QML CI corretto', function() {
            expect(check.checkQML(
                "Collega città e squadra di calcio\n" +
                "{Juventus,Torino|Inter,Milano|Sampdoria,Genova|Lazio,Roma|Lanerossi,Vicenza}")).to.equal(true);
        });

        it('deve bloccare QML CI con secondo elemento coppia mancante', function() {
            expect(check.checkQML(
                "Collega città e squadra di calcio\n" +
                "{Juventus,Torino|Inter,Milano|Sampdoria|Lazio,Roma|Lanerossi,Vicenza}")).to.equal(false);
        });

        it('deve bloccare QML CI con solo un opzione', function() {
            expect(check.checkQML(
                "Collega città e squadra di calcio\n" +
                "{Juventus,Torino}")).to.equal(false);
        });

        it('deve bloccare QML CI con nessuna opzione', function() {
            expect(check.checkQML(
                "Collega città e squadra di calcio\n" +
                "{}")).to.equal(false);
        });

        /* Range Number */
        it('deve accettare QML RN corretto', function() {
            expect(check.checkQML(
                "Testo\n" +
                "{100, 3}")).to.equal(true);
        });

        it('deve rifiutare QML RN con solo un numero', function() {
            expect(check.checkQML(
                "Testo\n" +
                "{100}")).to.equal(false);
        });

        it('deve rifiutare QML RN con nessun numero', function() {
            expect(check.checkQML(
                "Testo\n" +
                "{}")).to.equal(false);
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