var expect = require('chai').expect;
var request = require('supertest');

var login = require('../../utils/LoginUtils').login;
var app = require('../../utils/AppUtils').testApp;

describe('/api/answers', function() {

    describe('GET /api/answers', function() {

        it("permette l'accesso ad un utente non autenticato", function (done) {
            request(app)
                .get('/api/answers')
                .end(function(err, res) {
                    expect(err).to.not.be.ok;
                    expect(res).to.have.property('status', 200);
                    expect(res.body).to.be.instanceof(Array);
                    expect(res.body.length).to.be.equal(4);
                    expect(res.body[0]).to.have.property('_id');
                    expect(res.body[0]).to.have.property('question');
                    expect(res.body[0]).to.have.property('questionnaire');
                    expect(res.body[0]).to.have.property('author');
                    expect(res.body[0]).to.have.property('score');
                    done();
                });
        });

        it("ritorna la lista delle domande all'utente autenticato", function (done) {
            login(app, {
                userName: 'tullio.vardanega',
                password: 'password.tullio.vardanega'
            }, function(agent) {
                var req = request(app).get('/api/answers');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    expect(err).to.not.be.ok;
                    expect(res).to.have.property('status', 200);
                    expect(res.body).to.be.instanceof(Array);
                    expect(res.body.length).to.be.equal(4);
                    expect(res.body[0]).to.have.property('_id');
                    expect(res.body[0]).to.have.property('question');
                    expect(res.body[0]).to.have.property('questionnaire');
                    expect(res.body[0]).to.have.property('author');
                    expect(res.body[0]).to.have.property('score');
                    done();
                });
            });
        });

    });

    describe('GET /api/answers/:id', function() {

        it("permette l'accesso ad un utente non autenticato", function (done) {
            request(app)
                    .get('/api/answers')
                    .end(function(err, res) {
                expect(err).to.not.be.ok;
                expect(res).to.have.property('status', 200);
                expect(res.body).to.be.instanceof(Array);
                expect(res.body.length).to.be.above(1);

                var answer = res.body[0];
                request(app)
                        .get('/api/answers/'+answer._id)
                        .end(function(err, res) {
                    expect(err).to.not.be.ok;
                    expect(res).to.have.property('status', 200);
                    expect(res.body).to.have.property('_id', answer._id);
                    expect(res.body).to.have.property('question', answer.question);
                    expect(res.body).to.have.property('questionnaire', answer.questionnaire);
                    expect(res.body).to.have.property('author', answer.author);
                    expect(res.body).to.have.property('score', answer.score);
                });
                done();
            });
        });

        it("ritorna la domanda specificata", function (done) {
            login(app, {
                userName: 'tullio.vardanega',
                password: 'password.tullio.vardanega'
            }, function(agent) {
                var req = request(app).get('/api/answers');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    expect(err).to.not.be.ok;
                    expect(res).to.have.property('status', 200);
                    expect(res.body).to.be.instanceof(Array);
                    expect(res.body.length).to.be.above(1);

                    var answer = res.body[0];
                    var req = request(app).get('/api/answers/'+answer._id);
                    agent.attachCookies(req);
                    req.end(function(err, res) {
                        expect(err).to.not.be.ok;
                        expect(res).to.have.property('status', 200);
                        expect(res.body).to.have.property('_id', answer._id);
                        expect(res.body).to.have.property('question', answer.question);
                        expect(res.body).to.have.property('questionnaire', answer.questionnaire);
                        expect(res.body).to.have.property('author', answer.author);
                        expect(res.body).to.have.property('score', answer.score);
                    });
                    done();
                });
            });
        });

    });

    describe('POST /api/answers', function() {

        it("permette l'accesso ad un utente non autenticato", function (done) {

            request(app).get('/api/questionnaires').end(function(err, res) {
                expect(err).to.not.be.ok;
                expect(res).to.have.property('status', 200);
                expect(res.body).to.be.instanceof(Array);
                expect(res.body.length).to.be.above(0);

                var questionnaire = res.body[0]._id;
                var question = res.body[0].questions[0];
                var newAnswer = {
                    question: question,
                    questionnaire: questionnaire,
                    score: 2
                };
                request(app).post('/api/answers').send(newAnswer).end(function(err, res) {
                    expect(err).to.not.be.ok;
                    expect(res).to.have.property('status', 200);
                    done();
                });

            });

        });

        it("inserisce la nuova risposta correttamente", function (done) {

            // login
            login(app, {
                userName: 'riccardo.cardin',
                password: 'password.riccardo.cardin'
            }, function(agent) {

                // get list of questionnaires and select first
                var req = request(app).get('/api/questionnaires');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    expect(err).to.not.be.ok;
                    expect(res).to.have.property('status', 200);
                    expect(res.body).to.be.instanceof(Array);
                    expect(res.body.length).to.be.above(0);

                    // post a new answer to the first question of the
                    // questionnaire
                    var questionnaire = res.body[0]._id;
                    var question = res.body[0].questions[0];
                    var newAnswer = {
                        question: question,
                        questionnaire: questionnaire,
                        score: 2
                    };
                    var req = request(app).post('/api/answers').send(newAnswer);
                    agent.attachCookies(req);
                    req.end(function(err, res) {
                        expect(err).to.not.be.ok;
                        expect(res).to.have.property('status', 200);

                        // get my id
                        var req = request(app).get('/api/users/me');
                        agent.attachCookies(req);
                        req.end(function(err, res) {
                            expect(err).to.not.be.ok;
                            expect(res).to.have.property('status', 200);
                            var author = res.body._id;

                            // search that the new answer exists
                            var req = request(app).get(
                                '/api/answers?authors=' + author + 
                                    '&questions=' + question +
                                    '&questionnaires=' + questionnaire);
                            agent.attachCookies(req);
                            req.end(function(err, res) {
                                expect(err).to.not.be.ok;
                                expect(res).to.have.property('status', 200);
                                expect(res.body).to.be.instanceof(Array);
                                expect(res.body).to.have.property('length', 1);

                                var answer = res.body[0];
                                expect(answer).to.have.property('_id');
                                expect(answer).to.have.property('question', question);
                                expect(answer).to.have.property('questionnaire', questionnaire);
                                expect(answer).to.have.property('score', 2);
                                expect(answer).to.have.property('author', author);

                                done();
                            });

                        });

                    });

                });

            });

        });

    });

});