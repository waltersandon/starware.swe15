var expect = require('chai').expect;
var request = require('supertest');

var login = require('../../utils/LoginUtils').login;
var app = require('../../utils/AppUtils').testApp;

describe('/api/questions', function() {

    describe('GET /api/questions', function() {

        it("permette l'accesso ad un utente non autenticato", function (done) {
            request(app)
                .get('/api/questions')
                .end(function(err, res) {
                    expect(err).to.not.be.ok;
                    expect(res).to.have.property('status', 200);
                    expect(res.body).to.be.instanceof(Array);
                    expect(res.body.length).to.be.equal(3);
                    expect(res.body[0]).to.have.property('_id');
                    expect(res.body[0]).to.have.property('body');
                    expect(res.body[0]).to.have.property('author');
                    expect(res.body[0]).to.have.property('tags');
                    expect(res.body[0].tags).to.be.instanceof(Array);
                    done();
                });
        });

        it("ritorna la lista delle domande all'utente autenticato", function (done) {
            login(app, {
                userName: 'tullio.vardanega',
                password: 'password.tullio.vardanega'
            }, function(agent) {
                var req = request(app).get('/api/questions');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    expect(err).to.not.be.ok;
                    expect(res).to.have.property('status', 200);
                    expect(res.body).to.be.instanceof(Array);
                    expect(res.body.length).to.be.equal(3);
                    expect(res.body[0]).to.have.property('_id');
                    expect(res.body[0]).to.have.property('body');
                    expect(res.body[0]).to.have.property('author');
                    expect(res.body[0]).to.have.property('tags');
                    expect(res.body[0].tags).to.be.instanceof(Array);
                    done();
                });
            });
        });

    });

    describe('GET /api/questions/:id', function() {

        it("permette l'accesso ad un utente non autenticato", function (done) {
            request(app)
                    .get('/api/questions')
                    .end(function(err, res) {
                expect(err).to.not.be.ok;
                expect(res).to.have.property('status', 200);
                expect(res.body).to.be.instanceof(Array);
                expect(res.body.length).to.be.above(1);

                var question = res.body[0];
                request(app)
                        .get('/api/questions/'+question._id)
                        .end(function(err, res) {
                    expect(err).to.not.be.ok;
                    expect(res).to.have.property('status', 200);
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('body');
                    expect(res.body).to.have.property('author');
                    expect(res.body).to.have.property('tags');
                });
                done();
            });
        });

        it("ritorna la domanda specificata", function (done) {
            login(app, {
                userName: 'tullio.vardanega',
                password: 'password.tullio.vardanega'
            }, function(agent) {
                var req = request(app).get('/api/questions');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    expect(err).to.not.be.ok;
                    expect(res).to.have.property('status', 200);
                    expect(res.body).to.be.instanceof(Array);
                    expect(res.body.length).to.be.above(1);

                    var question = res.body[0];
                    var req = request(app).get('/api/questions/'+question._id);
                    agent.attachCookies(req);
                    req.end(function(err, res) {
                        expect(err).to.not.be.ok;
                        expect(res).to.have.property('status', 200);
                        expect(res.body).to.have.property('_id');
                        expect(res.body).to.have.property('body');
                        expect(res.body).to.have.property('author');
                        expect(res.body).to.have.property('tags');
                    });
                    done();
                });
            });
        });

    });

    describe('POST /api/questions', function() {

        it("non permette la creazione di una domanda ad un utente con ruolo inferiore a docente", function (done) {
            login(app, {
                userName: 'mario.rossi',
                password: 'password.mario.rossi'
            }, function(agent) {
                var req = request(app).get('/api/tags');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    expect(err).to.not.be.ok;
                    expect(res).to.have.property('status', 200);
                    expect(res.body).to.be.instanceof(Array);
                    expect(res.body.length).to.be.above(2);
                    var tags = res.body;

                    var newQuestion = {
                        body: "Questa domanda verrà eliminata?\n(+)",
                        tags: [tags[0], tags[1]]
                    };
                    var req = request(app).post('/api/questions').send(newQuestion);
                    agent.attachCookies(req);
                    req.end(function(err, res) {
                        expect(err).to.not.be.ok;
                        expect(res).to.have.property('status', 401);
                        done();
                    });
                });
            });
        });

        it("crea la domanda specificata", function (done) {
            login(app, {
                userName: 'tullio.vardanega',
                password: 'password.tullio.vardanega'
            }, function(agent) {
                var req = request(app).get('/api/tags');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    expect(err).to.not.be.ok;
                    expect(res).to.have.property('status', 200);
                    expect(res.body).to.be.instanceof(Array);
                    expect(res.body.length).to.be.above(2);
                    var tags = res.body;

                    var newQuestion = {
                        body: "Questa domanda verrà eliminata?\n(+)",
                        tags: [tags[0]._id, tags[1]._id]
                    };
                    var req = request(app).post('/api/questions').send(newQuestion);
                    agent.attachCookies(req);
                    req.end(function(err, res) {
                        expect(err).to.not.be.ok;
                        expect(res).to.have.property('status', 200);

                        var req = request(app).get('/api/questions');
                        agent.attachCookies(req);
                        req.end(function(err, res) {
                            expect(err).to.not.be.ok;
                            expect(res).to.have.property('status', 200);
                            expect(res.body).to.be.instanceof(Array);
                            var maybeQuestion = res.body.find(function(q) {
                                return q.body == newQuestion.body;
                            });
                            expect(maybeQuestion).to.have.property('_id');
                            expect(maybeQuestion).to.have.property('body', newQuestion.body);
                            expect(maybeQuestion).to.have.property('author');
                            expect(maybeQuestion).to.have.property('tags');
                            done();
                        });
                    });
                });
            });
        });

        it("non crea una domanda con QML invalido", function (done) {
            login(app, {
                userName: 'tullio.vardanega',
                password: 'password.tullio.vardanega'
            }, function(agent) {
                var req = request(app).get('/api/tags');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    expect(err).to.not.be.ok;
                    expect(res).to.have.property('status', 200);
                    expect(res.body).to.be.instanceof(Array);
                    expect(res.body.length).to.be.above(2);
                    var tags = res.body;

                    var newQuestion = {
                        body: "QML non valido",
                        tags: [tags[0]._id, tags[1]._id]
                    };
                    var req = request(app).post('/api/questions').send(newQuestion);
                    agent.attachCookies(req);
                    req.end(function(err, res) {
                        expect(err).to.not.be.ok;
                        expect(res).to.have.property('status', 400);

                        var req = request(app).get('/api/questions');
                        agent.attachCookies(req);
                        req.end(function(err, res) {
                            expect(err).to.not.be.ok;
                            expect(res).to.have.property('status', 200);
                            expect(res.body).to.be.instanceof(Array);
                            var maybeQuestion = res.body.find(function(q) {
                                return q.body == newQuestion.body;
                            });
                            expect(maybeQuestion).to.not.be.ok;
                            done();
                        });
                    });
                });
            });
        });

        it("non crea una domanda senza tag", function (done) {
            login(app, {
                userName: 'tullio.vardanega',
                password: 'password.tullio.vardanega'
            }, function(agent) {
                var req = request(app).get('/api/tags');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    expect(err).to.not.be.ok;
                    expect(res).to.have.property('status', 200);
                    expect(res.body).to.be.instanceof(Array);
                    expect(res.body.length).to.be.above(2);
                    var tags = res.body;

                    var newQuestion = {
                        body: "Questa domanda verrà aggiunta?\n(-)",
                        tags: []
                    };
                    var req = request(app).post('/api/questions').send(newQuestion);
                    agent.attachCookies(req);
                    req.end(function(err, res) {
                        expect(err).to.not.be.ok;
                        expect(res).to.have.property('status', 400);

                        var req = request(app).get('/api/questions');
                        agent.attachCookies(req);
                        req.end(function(err, res) {
                            expect(err).to.not.be.ok;
                            expect(res).to.have.property('status', 200);
                            expect(res.body).to.be.instanceof(Array);
                            var maybeQuestion = res.body.find(function(q) {
                                return q.body == newQuestion.body;
                            });
                            expect(maybeQuestion).to.not.be.ok;
                            done();
                        });
                    });
                });
            });
        });

    });
    describe('PUT /api/questions/:id',function () {
        it('impedisce l\'accesso ad un utente non autorizzato', function (done) {
            login(app, {
                userName: 'tullio.vardanega',
                password: 'password.tullio.vardanega'
            }, function(agent) {
                var newQuestion ={
                    body: "Domanda\n()Opzione \n()Opzione\n(*)OpzioneGiusta \n()Opzione",
                    tags: []
                };
                var req = request(app).get('/api/questions');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    expect(res).to.have.property('status', 200);
                    var question = res.body[res.body.length - 1];
                    var id = question._id;
                    newQuestion.tags.push(question.tags[0]);
                    login(app, {
                        userName: 'mario.rossi',
                        password: 'password.mario.rossi'
                    }, function(agent) {
                        var req = request(app).put('/api/questions/'+id);
                        agent.attachCookies(req);
                        req.send(newQuestion).end(function(err, res) {
                            expect(res).to.have.property('status', 401);
                            done();
                        });
                    });

                });
            });
        });
        it('permette la modifica della domanda di test all\'utente autenticato', function (done) {
            login(app, {
                userName: 'tullio.vardanega',
                password: 'password.tullio.vardanega'
            }, function(agent) {
                var newQuestion ={
                    body: "Domanda\n()Opzione \n()Opzione\n(*)OpzioneGiusta \n()Opzione",
                    tags: []
                };
                var req = request(app).get('/api/questions');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    expect(res).to.have.property('status', 200);
                    var question = res.body[res.body.length - 1];
                    var id = question._id;
                    newQuestion.tags.push(question.tags[0]);
                    var req = request(app).put('/api/questions/'+id);
                    agent.attachCookies(req);
                    req.send(newQuestion).end(function(err, res) {
                        expect(res).to.have.property('status', 200);
                        var req = request(app).get('/api/questions/'+id);
                        agent.attachCookies(req);
                        req.end(function(err, res) {
                            expect(res).to.have.property('status', 200);
                            expect(res.body.body).to.eql(newQuestion.body);
                            expect(res.body.tags.length).to.be.eql(1);
                            expect(res.body.tags[0]).to.be.eql(question.tags[0]);
                            done();
                        });
                    });


                });
            });

        });
        it('blocca la modifica della domanda di test all\'utente autenticato non autore', function (done) {
            login(app, {
                userName: 'riccardo.cardin',
                password: 'password.riccardo.cardin'
            }, function(agent) {
                var newQuestion ={
                    body: "Domanda\n()Opzione \n()Opzione\n(*)OpzioneGiusta \n()Opzione",
                    tags: []
                };
                var req = request(app).get('/api/questions');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    expect(res).to.have.property('status', 200);
                    var question = res.body[res.body.length - 1];
                    var id = question._id;
                    newQuestion.tags.push(question.tags[0]);
                    var req = request(app).put('/api/questions/'+id);
                    agent.attachCookies(req);
                    req.send(newQuestion).end(function(err, res) {
                        expect(res).to.have.property('status', 401);
                            done();
                    });

                });
            });

        });

    });
    describe('DELETE /api/questions/:id',function () {
        it('impedisce l\'accesso ad un utente non autorizzato', function (done) {
            login(app, {
                userName: 'mario.rossi',
                password: 'password.mario.rossi'
            }, function(agent) {
                var req = request(app).get('/api/questions');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    expect(res).to.have.property('status', 200);
                    var question = res.body.find(function (question) {
                        return question.body === "Domanda\n()Opzione \n()Opzione\n(*)OpzioneGiusta \n()Opzione";
                    });
                    var req = request(app).delete('/api/questions/'+question._id);
                    agent.attachCookies(req);
                    req.send(question).end(function(err, res) {
                        expect(res).to.have.property('status', 401);
                        done();
                    });
                });
            })
        });
        it('permette la cancellazione del questionario di test all\'utente autenticato', function (done) {
            login(app, {
                userName: 'tullio.vardanega',
                password: 'password.tullio.vardanega'
            }, function(agent) {
                //richiesta per ottenere id del tag che si vuole cancellare
                var req = request(app).get('/api/questions');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    var question = res.body.find(function (question) {
                        return question.body === "Domanda\n()Opzione \n()Opzione\n(*)OpzioneGiusta \n()Opzione";
                    });
                    //richiesta di cancellazione
                    var req = request(app).delete('/api/questions/'+question._id);
                    agent.attachCookies(req);
                    req.end(function(err, res) {
                        expect(res).to.have.property('status', 200);
                        // richiesta della verifica della avvenuta cancellazione
                        var req = request(app).get('/api/questions/'+question._id);
                        agent.attachCookies(req);
                        req.end(function(err, res) {
                            expect(res).to.have.property('status', 404);
                            done();
                        });
                    });
                });
            });
        });
        it('blocca la cancellazione della domanda di test all\'utente autenticato non autore', function (done) {
            login(app, {
                userName: 'riccardo.cardin',
                password: 'password.riccardo.cardin'
            }, function(agent) {
                //richiesta per ottenere id del tag che si vuole cancellare
                var req = request(app).get('/api/questions');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    var question = res.body[0];
                    //richiesta di cancellazione
                    var req = request(app).delete('/api/questions/'+question._id);
                    agent.attachCookies(req);
                    req.end(function(err, res) {
                        expect(res).to.have.property('status', 401);
                            done();
                    });
                });
            });
        });
        it('blocca la cancellazione della domanda utilizzata in un questionario all\'utente autenticato', function (done) {
            login(app, {
                userName: 'tullio.vardanega',
                password: 'password.tullio.vardanega'
            }, function(agent) {
                //richiesta per ottenere id del tag che si vuole cancellare
                var req = request(app).get('/api/questions');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    var question = res.body[0];
                    //richiesta di cancellazione
                    var req = request(app).delete('/api/questions/'+question._id);
                    agent.attachCookies(req);
                    req.end(function(err, res) {
                        expect(res).to.have.property('status', 400);
                        done();
                    });
                });
            });
        });

    });

});