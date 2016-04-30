var expect = require('chai').expect;
var request = require('supertest');
var login = require('./../../utils/LoginUtils').login;
var app = require('../../utils/AppUtils').testApp;

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
                tags: [{ id: undefined }],
                questions: [{id: undefined }]
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
                        tags_id.push({"id": elem._id} );
                });
                //console.log(tags_id);
                newQuestionnaire.tags = tags_id;
                var req = request(app).get('/api/questions');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    expect(err).to.not.be.ok;
                    expect(res).to.have.property('status', 200);
                    expect(res.body.length > 0).to.be.equal(true);
                    var questions_id = [];
                    res.body.forEach(function (elem) {
                        questions_id.push({"id": ""+elem._id+"" } );

                    });
                    //console.log(questions_id);
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
describe('PUT /api/questionnaires/:id', function() {});
/*
describe('DELETE /api/questionnaires/:id', function() {

    /*it('impedisce l\'accesso ad un utente non autorizzato', function (done) {
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
    it('permette la cancellazione del tag di test all\'utente autenticato', function (done) {
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
                var req = request(app).delete('/api/tags/'+questionnaire._id);
                agent.attachCookies(req);
                req.end(function(err, res) {
                    expect(res).to.have.property('status', 200);
                    // richiesta della verifica della avvenuta cancellazione
                    var req = request(app).get('/api/questionnaires/');
                    agent.attachCookies(req);
                    req.end(function(err, res) {
                        expect(res).to.have.property('status', 200);
                        expect(res.body.find(function (questionnaire) {
                            return questionnaire.title === "Quiz Test Dopo Put";
                        })).to.eql(undefined);
                        done();
                    });
                });
            });
        });
    });
});
*/
/*
 this.router.put('/questionnaires/:id',auth.requireTeacher,this.questionnaireService.modify);
 this.router.delete('/questionnaires/:id',auth.requireTeacher,this.questionnaireService.delete);
 */