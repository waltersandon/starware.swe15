var expect = require('chai').expect;
var request = require('supertest');

var login = require('./../../utils/LoginUtils').login;
var app = require('../../utils/AppUtils').testApp;

describe('GET /api/questions', function() {

    it("impedisce l'accesso ad un utente non autenticato", function (done) {
        request(app)
            .get('/api/questions')
            .end(function(err, res) {
                expect(err).to.not.be.ok;
                expect(res).to.have.property('status', 401);
                done();
            });
    });

    it("ritorna la lista dei questionari all'utente autenticato", function (done) {
        login(app, {
            userName: 'tullio.vardanega',
            password: 'password.tullio.vardanega'
        }, function(agent) {
            var req = request(app).get('/api/questions');
            agent.attachCookies(req);
            req.end(function(err, res) {
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
describe('PUT /api/questions/:id',function () {
    it('impedisce l\'accesso ad un utente non autorizzato', function (done) {
        login(app, {
            userName: 'tullio.vardanega',
            password: 'password.tullio.vardanega'
        }, function(agent) {
            var newQuestion ={
                body: "<MultipleChoice>Domanda \n[]Opzione \n[]Opzione\n[*]OpzioneGiusta \n[]Opzione" ,
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
    it('permette la modifica della domanda di test  all\'utente autenticato', function (done) {
        login(app, {
            userName: 'tullio.vardanega',
            password: 'password.tullio.vardanega'
        }, function(agent) {
            var newQuestion ={
                body: "<MultipleChoice>Domanda \n[]Opzione \n[]Opzione\n[*]OpzioneGiusta \n[]Opzione" ,
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
                        expect(res.body.body).to.eql("<MultipleChoice>Domanda \n[]Opzione \n[]Opzione\n[*]OpzioneGiusta \n[]Opzione");
                        expect(res.body.tags.length).to.be.eql(1);
                        expect(res.body.tags[0]).to.be.eql(question.tags[0]);
                        done();
                    });
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
                    return question.body === "<MultipleChoice>Domanda \n[]Opzione \n[]Opzione\n[*]OpzioneGiusta \n[]Opzione";
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
                    return question.body === "<MultipleChoice>Domanda \n[]Opzione \n[]Opzione\n[*]OpzioneGiusta \n[]Opzione";
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

});