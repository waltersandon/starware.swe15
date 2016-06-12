describe('util.QML', function() {
    var QMLModule;
    var questions = [
        {
            id: 'id_question_1',
            body: 'Testo domanda\nSeconda linea\n(-)',
            author: 'id_author_1',
            tags: [ { id: 'id_tag_1' } ]
        },
        {
            id: 'id_question_2',
            body: 'Testo domanda\nSeconda linea\n(+)',
            author: 'id_author_1',
            tags: [ { id: 'id_tag_1' } ]
        },
        {
            id: 'id_question_3',
            body: 'Domanda\n[answers]\n()Opzione \n()Opzione\n(*)OpzioneGiusta \n()Opzione',
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
        it('esegue parse della domanda MC', function () {
            var risposta = QMLModule.parse(questions[2].body);
            expect(risposta).toBeDefined();
            expect(risposta.status).toBe(true);
            expect(risposta.type).toBe('MC');
            expect(risposta.answer).toBe(2);
        });

    });
});