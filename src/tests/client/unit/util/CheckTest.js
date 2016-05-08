describe('util.Check', function() {
    var CheckModule;

    var questionnaires = [
        {
            id: 'id_questionnaire_1',
            author: 'id_author_1',
            questions: ['testQuestion1','testQuestion2'],
            tags: [ { id: 'id_tag_1' } ],
            title: "Questionario Test"
        },
        {
            id: 'id_questionnaire_2',
            author: 'id_author_1',
            questions: ['testQuestion1','testQuestion2'],
            tags: [ { id: 'id_tag_1' } ],
            title: "Questionario Test"
        },
        {
            id: 'id_questionnaire_3',
            author: 'id_author_1',
            questions: ['testQuestion1','testQuestion2'],
            tags: [ { id: 'id_tag_1' } ],
            title: "Questionario Test"
        }
    ];

    beforeEach(function () {
        module('CheckModule', function ($provide) {
            var QuestionnaireService = function () {
                this.get = function(author, tags, title, next, err) {
                    next(questionnaires);
                };
            };

            $provide.service("model.service.QuestionnaireService", QuestionnaireService);
        });

        inject(function ($injector) {
            CheckModule = $injector.get('util.Check');
            });
        });
    describe('checkFullName', function () {

        it('deve accettare fullName lungo 3 caratteri ', function () {
            var risposta = CheckModule.checkFullName("123");
            expect(!risposta.status).toBe(true);
        });
        it('deve bloccare fullName lungo 1 caratteri ', function () {
            var risposta = CheckModule.checkFullName("1");
            expect(risposta.status).toBe(true);
        });

    });
    describe('checkPassword', function () {
        it('deve accettare password lungo 6 caratteri ', function () {
            var risposta = CheckModule.checkPassword("123456");
            expect(!risposta.status).toBe(true);
        });
        it('deve bloccare password lungo 5 caratteri ', function () {
            var risposta = CheckModule.checkPassword("12345");
            expect(risposta.status).toBe(true);
        });


    });
    describe('checkPassword', function () {
        it('deve accettare password lungo 6 caratteri ', function () {
            var risposta = CheckModule.checkPassword("123456");
            expect(!risposta.status).toBe(true);
        });
        it('deve bloccare password lungo 5 caratteri ', function () {
            var risposta = CheckModule.checkPassword("12345");
            expect(risposta.status).toBe(true);
        });


    });
    describe('checkTitle', function () {
        it('deve segnalare  titolo non presente ', function () {
            CheckModule.checkTitle("Questionario Test2", function (res) {
                expect(res).toBe(false);
            });
        });
        it('deve segnalare titolo presente', function () {
            CheckModule.checkTitle("Questionario Test", function (res) {
                expect(res).toBe(true);
            });
        });


    });
    describe('checkUserName', function () {

        it('deve accettare UserName lungo 6 caratteri ', function () {
            var risposta = CheckModule.checkUserName("123456");
            expect(!risposta.status).toBe(true);
        });
        it('deve bloccare UserName lungo 5 caratteri ', function () {
            var risposta = CheckModule.checkUserName("12345");
            expect(risposta.status).toBe(true);
        });

    });



});