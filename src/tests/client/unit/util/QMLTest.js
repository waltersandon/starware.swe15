describe('util.QML', function() {
    var QMLModule;
    var questions = [
        {
            id: 'id_question_1',
            body: '<TF F>\nTesto domanda\nSeconda linea',
            author: 'id_author_1',
            tags: [ { id: 'id_tag_1' } ]
        },
        {
            id: 'id_question_2',
            body: '<TF T>\nTesto domanda\nSeconda linea',
            author: 'id_author_1',
            tags: [ { id: 'id_tag_1' } ]
        },
        {
            id: 'id_question_3',
            body: '<MultipleChoice>Domanda\n[answers]\n[]Opzione \n[]Opzione\n[*]OpzioneGiusta \n[]Opzione',
            author: 'id_author_1',
            tags: [ { id: 'id_tag_1' } ]
        }
    ];
    beforeEach(function () {
        module('QMLModule');
        inject(function ($injector) {
            QMLModule = $injector.get('util.QML');
        });
    });
    describe('preview', function () {
        it('visualizza preview body  ', function () {
            var risposta = QMLModule.preview(questions[0].body);
            expect(risposta).toBeDefined();
            expect(risposta).toEqual("Testo domanda");
        });
        it('visualizza preview body  ', function () {
            var risposta = QMLModule.preview("");
            expect(risposta).toBeDefined();
            expect(risposta).toEqual("");
        });

    });
    describe('parse', function () {
        it('esegue parse della domanda TF F', function () {
            var risposta = QMLModule.parse(questions[0].body);
            expect(risposta).toBeDefined();
            expect(risposta.status).toBe(true);
            expect(risposta.type).toBe('TF');
            expect(risposta.answer).toBe(false);
            expect(risposta.answers).toEqual([{value: true, str: 'Vero'}, {value: false, str: 'Falso'}])

        });
        it('esegue parse della domanda TF T', function () {
            var risposta = QMLModule.parse(questions[1].body);
            expect(risposta).toBeDefined();
            expect(risposta.status).toBe(true);
            expect(risposta.type).toBe('TF');
            expect(risposta.answer).toBe(true);
            expect(risposta.answers).toEqual([{value: true, str: 'Vero'}, {value: false, str: 'Falso'}])
        });
        it('esegue parse della domanda MultipleChoice', function () {
            var risposta = QMLModule.parse(questions[2].body);
            expect(risposta).toBeDefined();
            expect(risposta.status).toBe(true);
            expect(risposta.type).toBe('MultipleChoice');
            expect(risposta.answer).toBe(2);
        });

    });
});