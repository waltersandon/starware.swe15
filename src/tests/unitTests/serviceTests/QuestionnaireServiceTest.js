var expect = require('chai').expect;
var request = require('supertest');
var login = require('./../../utils/LoginUtils').login;
var app = require('../../utils/AppUtils').testApp;

describe('/api/questionnaires', function() {

    describe('GET /api/questionnaires', function() {
        it('impedisce l\'accesso ad un utente non autenticato', function (done) {
            request(app)
                .get('/api/questionnaires')
                .end(function(err, res) {
                    expect(err).to.not.be.ok;
                    expect(res).to.have.property('status', 401);
                    done();
                });
        });
        it('ritorna la lista dei questionari all\'utente autenticato', function (done) {
            login(app, {
                userName: 'mario.rossi',
                password: 'password.mario.rossi'
            }, function(agent) {
                var req = request(app).get('/api/questionnaires');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    expect(res).to.have.property('status', 200);

                    expect(res.body.find(function (questionnaire) {
                        return questionnaire.title === "Quiz 1";
                    }).title).to.eql("Quiz 1");

                    done();
                });
            });
        });
    });
    describe('GET /api/questionnaires/:id', function() {
        it('impedisce l\'accesso ad un utente non autenticato', function (done) {
            login(app, {
                userName: 'mario.rossi',
                password: 'password.mario.rossi'
            }, function(agent) {
                var req = request(app).get('/api/questionnaires');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    expect(res).to.have.property('status', 200);

                    var id = res.body.find(function (questionnaire) {
                        return questionnaire.title === "Quiz 1";
                    })._id;
                    request(app)
                        .get('/api/questionnaires/'+id)
                        .end(function(err, res) {
                            expect(err).to.not.be.ok;
                            expect(res).to.have.property('status', 401);
                            done();
                        });
                });
            });
        });
        it('ritorna il questionario per id passato all\'utente autenticato', function (done) {
            login(app, {
                userName: 'mario.rossi',
                password: 'password.mario.rossi'
            }, function(agent) {
                var req = request(app).get('/api/questionnaires');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    expect(res).to.have.property('status', 200);
                    var id = res.body.find(function (questionnaire) {
                        return questionnaire.title === "Quiz 1";
                    })._id;
                    var req = request(app).get('/api/questionnaires/'+id);
                    agent.attachCookies(req);
                    req.end(function(err, res) {
                        expect(res).to.have.property('status', 200);
                        expect(res.body.title).to.eql("Quiz 1");
                    });
                    done();
                });
            });
        });
    });
    describe('POST /api/questionnaires', function() {
        it('impedisce l\'accesso ad un utente non autorizzato', function (done) {
            login(app, {
                userName: 'tullio.vardanega',
                password: 'password.tullio.vardanega'
            }, function(agent) {
                var newQuestionnaire ={
                    title: "Quiz Test" ,
                    tags: [],
                    questions: []
                };
                var req = request(app).get('/api/tags');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    expect(err).to.not.be.ok;
                    expect(res).to.have.property('status', 200);
                    expect(res.body.length > 0).to.be.equal(true);
                    newQuestionnaire.tags = res.body;
                    var req = request(app).get('/api/questions');
                    agent.attachCookies(req);
                    req.end(function(err, res) {
                        expect(err).to.not.be.ok;
                        expect(res).to.have.property('status', 200);
                        expect(res.body.length > 0).to.be.equal(true);
                        newQuestionnaire.questions = res.body;
                        login(app, {
                            userName: 'mario.rossi',
                            password: 'password.mario.rossi'
                        }, function(agent) {
                            var req = request(app).post('/api/questionnaires');
                            agent.attachCookies(req);
                            req.send(newQuestionnaire).end(function(err, res) {
                                expect(err).to.not.be.ok;
                                expect(res).to.have.property('status', 401);
                                done();
                            });
                        });
                    });
                });
            })
        });
        it('permette la creazione del quiz di test  all\'utente autenticato', function (done) {
            login(app, {
                userName: 'tullio.vardanega',
                password: 'password.tullio.vardanega'
            }, function(agent) {
                var newQuestionnaire ={
                    title: "Quiz Test" ,
                    tags: [],
                    questions: []
                };
                var req = request(app).get('/api/tags');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    expect(err).to.not.be.ok;
                    expect(res).to.have.property('status', 200);
                    expect(res.body.length > 0).to.be.equal(true);
                    var tags_id = [];
                    res.body.forEach(function (elem) {
                            tags_id.push(elem._id);
                    });
                    newQuestionnaire.tags = tags_id;
                    var req = request(app).get('/api/questions');
                    agent.attachCookies(req);
                    req.end(function(err, res) {
                        expect(err).to.not.be.ok;
                        expect(res).to.have.property('status', 200);
                        expect(res.body.length > 0).to.be.equal(true);
                        var questions_id = [];
                        res.body.forEach(function (elem) {
                            questions_id.push(elem._id);

                        });
                        newQuestionnaire.questions = questions_id;
                        var req = request(app).post('/api/questionnaires');
                        //console.log(newQuestionnaire);
                        agent.attachCookies(req);

                        req.send(newQuestionnaire).end(function(err, res) {
                                expect(err).to.not.be.ok;
                                expect(res).to.have.property('status', 200);

                            var req = request(app).get('/api/questionnaires');
                            agent.attachCookies(req);
                            req.end(function(err, res) {
                                expect(res).to.have.property('status', 200);

                                expect(res.body.find(function (questionnaire) {
                                    return questionnaire.title === "Quiz Test";
                                }).title).to.eql("Quiz Test");

                                done();
                            });
                        });
                    });
                });
            })
        });
    });
    describe('PUT /api/questionnaires/:id', function() {

        it('impedisce l\'accesso ad un utente non autorizzato', function (done) {
            login(app, {
                userName: 'tullio.vardanega',
                password: 'password.tullio.vardanega'
            }, function(agent) {
                var newQuestionnaire ={
                    title: "Quiz Test Dopo Put" ,
                    tags: [],
                    questions: []
                };
                var req = request(app).get('/api/questionnaires');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    expect(res).to.have.property('status', 200);
                    var questionnaire = res.body.find(function (questionnaire) {
                        return questionnaire.title === "Quiz Test";
                    });
                    var id = questionnaire._id;
                    newQuestionnaire.tags.push(questionnaire.tags[0]);
                    newQuestionnaire.questions.push(questionnaire.questions[0]);
                    login(app, {
                        userName: 'mario.rossi',
                        password: 'password.mario.rossi'
                    }, function(agent) {
                        var req = request(app).put('/api/questionnaires/'+id);
                        agent.attachCookies(req);
                        req.send(newQuestionnaire).end(function(err, res) {
                            expect(res).to.have.property('status', 401);
                            done();
                        });
                    });

                });
            });
        });

        it('permette la modifica dela domanda di test  all\'utente autenticato', function (done) {
            login(app, {
                userName: 'tullio.vardanega',
                password: 'password.tullio.vardanega'
            }, function(agent) {
                var newQuestionnaire ={
                    title: "Quiz Test Dopo Put" ,
                    tags: [],
                    questions: []
                };
                var req = request(app).get('/api/questionnaires');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    expect(res).to.have.property('status', 200);
                    var questionnaire = res.body.find(function (questionnaire) {
                        return questionnaire.title === "Quiz Test";
                    });
                    var id = questionnaire._id;
                    newQuestionnaire.tags.push(questionnaire.tags[0]);
                    newQuestionnaire.questions.push(questionnaire.questions[0]);
                        var req = request(app).put('/api/questionnaires/'+id);
                        agent.attachCookies(req);
                        req.send(newQuestionnaire).end(function(err, res) {
                            expect(res).to.have.property('status', 200);
                            var req = request(app).get('/api/questionnaires/'+id);
                            agent.attachCookies(req);
                            req.end(function(err, res) {
                                expect(res).to.have.property('status', 200);
                                expect(res.body.title).to.eql("Quiz Test Dopo Put");
                                expect(res.body.tags.length).to.eql(1);
                                expect(res.body.questions.length).to.eql(1);
                                expect(res.body.tags[0]).to.eql(questionnaire.tags[0]);
                                expect(res.body.questions[0]).to.eql(questionnaire.questions[0]);

                                done();
                            });
                        });


                });
            });

        });

        it("non permette la modifica di un questionario non proprio", function (done) {
            login(app, {
                userName: 'riccardo.cardin',
                password: 'password.riccardo.cardin'
            }, function(agent) {
                var newQuestionnaire ={
                    title: "Quiz Test Dopo Put" ,
                    tags: [],
                    questions: []
                };
                var req = request(app).get('/api/questionnaires');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    expect(res).to.have.property('status', 200);
                    var questionnaire = res.body[0];
                    newQuestionnaire.tags.push(questionnaire.tags[0]);
                    newQuestionnaire.questions.push(questionnaire.questions[0]);
                    var req = request(app).put('/api/questionnaires/'+questionnaire._id);
                    agent.attachCookies(req);
                    req.send(newQuestionnaire).end(function(err, res) {
                        expect(res).to.have.property('status', 401);
                        var req = request(app).get('/api/questionnaires/'+questionnaire._id);
                        agent.attachCookies(req);
                        req.end(function(err, res) {
                            expect(res).to.have.property('status', 200);
                            expect(res.body).to.have.property('title', questionnaire.title);
                            expect(res.body.questions).to.eql(questionnaire.questions);
                            expect(res.body.tags).to.eql(questionnaire.tags);
                            done();
                        });
                    });
                });
            });
        });

    });

    describe('DELETE /api/questionnaires/:id', function() {

        it('impedisce l\'accesso ad un utente non autorizzato', function (done) {
            login(app, {
                userName: 'mario.rossi',
                password: 'password.mario.rossi'
            }, function(agent) {
                var req = request(app).get('/api/questionnaires');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    var questionnaire = res.body.find(function (questionnnaire) {
                        return questionnnaire.title === "Quiz Test Dopo Put";
                    });
                    var req = request(app).delete('/api/questionnaires/'+questionnaire._id);
                    agent.attachCookies(req);
                    req.send(questionnaire).end(function(err, res) {
                        expect(res).to.have.property('status', 401);
                        done();
                    });
                });
            })
        });

        it('permette la cancellazione dela domanda di test all\'utente autenticato', function (done) {
            login(app, {
                userName: 'tullio.vardanega',
                password: 'password.tullio.vardanega'
            }, function(agent) {
                //richiesta per ottenere id del tag che si vuole cancellare
                var req = request(app).get('/api/questionnaires');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    var questionnaire = res.body.find(function (questionnaire) {
                        return questionnaire.title === "Quiz Test Dopo Put";
                    });
                    //richiesta di cancellazione
                    var req = request(app).delete('/api/questionnaires/'+questionnaire._id);
                    agent.attachCookies(req);
                    req.end(function(err, res) {
                        expect(res).to.have.property('status', 200);
                        // richiesta della verifica della avvenuta cancellazione
                        var req = request(app).get('/api/questionnaires/'+questionnaire._id);
                        agent.attachCookies(req);
                        req.end(function(err, res) {
                            expect(res).to.have.property('status', 404);
                            done();
                        });
                    });
                });
            });
        });

       it("permette la cancellazione dela domanda di test all'utente autenticato", function (done) {

            login(app, {
                userName: 'riccardo.cardin',
                password: 'password.riccardo.cardin'
            }, function(agent) {

                // ricerca domanda da eliminare
                var req = request(app).get('/api/questionnaires');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    var questionnaire = res.body[0];

                    // richiesta di cancellazione
                    var req = request(app).delete('/api/questionnaires/'+questionnaire._id);
                    agent.attachCookies(req);
                    req.end(function(err, res) {
                        expect(res).to.have.property('status', 401);

                        // verifica della non eliminazione
                        var req = request(app).get('/api/questionnaires/'+questionnaire._id);
                        agent.attachCookies(req);
                        req.end(function(err, res) {
                            expect(res).to.have.property('status', 200);
                            expect(res.body).to.have.property('_id');
                            expect(res.body).to.have.property('title');
                            expect(res.body).to.have.property('questions');
                            expect(res.body).to.have.property('tags');
                            done();
                        });

                    });

                });

            });

        });

    });

});
