/**
 * Created by igor on 22/04/16.
 */
var expect = require('chai').expect;
var request = require('supertest');
var login = require('../../utils/LoginUtils').login;
var app = require('../../utils/AppUtils').testApp;

describe('/api/questionnaires', function() {

    describe('GET /api/tags', function() {

        it('permette l\'accesso ad un utente non autenticato', function (done) {
            request(app)
                .get('/api/tags')
                .end(function(err, res) {
                    expect(err).to.not.be.ok;
                    expect(res).to.have.property('status', 200);

                    expect(res.body.find(function (tag) {
                        return tag.name === "Matematica";
                    }).name).to.eql("Matematica");

                    expect(res.body.find(function (tag) {
                        return tag.name === "Informatica";
                    }).name).to.eql("Informatica");

                    expect(res.body.find(function (tag) {
                        return tag.name === "Italiano";
                    }).name).to.eql("Italiano");

                    expect(res.body.find(function (tag) {
                        return tag.name === "SWE";
                    }).name).to.eql("SWE");

                    done();
                });
        });

        it('ritorna la lista dei tags all\'utente autenticato', function (done) {
            login(app, {
                userName: 'mario.rossi',
                password: 'password.mario.rossi'
            }, function(agent) {
                var req = request(app).get('/api/tags');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    expect(err).to.not.be.ok;
                    expect(res).to.have.property('status', 200);

                    expect(res.body.find(function (tag) {
                        return tag.name === "Matematica";
                    }).name).to.eql("Matematica");

                    expect(res.body.find(function (tag) {
                        return tag.name === "Informatica";
                    }).name).to.eql("Informatica");

                    expect(res.body.find(function (tag) {
                        return tag.name === "Italiano";
                    }).name).to.eql("Italiano");

                    expect(res.body.find(function (tag) {
                        return tag.name === "SWE";
                    }).name).to.eql("SWE");

                    done();
                });
            });
        });

    });
    describe('GET /api/tags/:id', function() {
        it('permette l\'accesso ad un utente non autenticato', function (done) {
            request(app)
                    .get('/api/tags')
                    .end(function(err, res) {
                expect(err).to.not.be.ok;
                expect(res).to.have.property('status', 200);
                var id = res.body.find(function (tag) {
                    return tag.name === "Matematica";
                })._id;
                request(app)
                        .get('/api/tags/'+id)
                        .end(function(err, res) {
                    expect(err).to.not.be.ok;
                    expect(res).to.have.property('status', 200);
                    expect(res.body.name).to.eql("Matematica");
                });
                done();
            });
        });
        it('ritorna il tag per id passato all\'utente autenticato', function (done) {
            login(app, {
                userName: 'mario.rossi',
                password: 'password.mario.rossi'
            }, function(agent) {
                var req = request(app).get('/api/tags');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    expect(res).to.have.property('status', 200);
                    var id = res.body.find(function (tag) {
                        return tag.name === "Matematica";
                    })._id;
                    var req = request(app).get('/api/tags/'+id);
                    agent.attachCookies(req);
                    req.end(function(err, res) {
                        expect(res).to.have.property('status', 200);
                        expect(res.body.name).to.eql("Matematica");
                    });
                    done();
                });
            });
        });

    });
    describe('POST /api/tags', function() {
        it('impedisce l\'accesso ad un utente non autorizzato', function (done) {
            login(app, {
                userName: 'mario.rossi',
                password: 'password.mario.rossi'
            }, function(agent) {
                var req = request(app).post('/api/tags');
                agent.attachCookies(req);
                req.send({
                    "name": "testTagStudente" ,
                    "description": "tag di testing"
                }).end(function(err, res) {
                    expect(err).to.not.be.ok;
                    expect(res).to.have.property('status', 401);
                    done();
                });
            })
        });

        it('permette la creazione del tag di test  all\'utente autenticato', function (done) {
            login(app, {
                userName: 'tullio.vardanega',
                password: 'password.tullio.vardanega'
            }, function(agent) {
                var req = request(app).post('/api/tags');
                agent.attachCookies(req);
                req.send({
                    "name": "testTag" ,
                    "description": "tag di testing"
                }).end(function(err, res) {
                    var req = request(app).get('/api/tags/');
                    agent.attachCookies(req);
                    req.end(function(err, res) {
                        expect(res).to.have.property('status', 200);
                        expect(res.body.find(function (tag) {
                            return tag.name === "testTag";
                        }).name).to.eql("testTag");
                        done();
                    });
                });
            });
        });

        it('non deve permettere la creazione di un tag con nome già esistente', function (done) {

            login(app, {
                userName: 'tullio.vardanega',
                password: 'password.tullio.vardanega'
            }, function(agent) {

                var req = request(app).post('/api/tags');
                agent.attachCookies(req);
                req.send({
                    "name": "Matematica" ,
                    "description": "questo tag non dovrebbe esistere"
                }).end(function(err, res) {
                    expect(err).to.not.be.ok;
                    expect(res).to.have.property('status', 400);

                    var req = request(app).get('/api/tags');
                    agent.attachCookies(req);
                    req.end(function(err, res) {
                        expect(res).to.have.property('status', 200);
                        var maybeTag = res.body.find(function (tag) {
                            return tag.description == "questo tag non dovrebbe esistere";
                        });
                        expect(maybeTag).not.to.be.ok;
                        done();
                    });

                });

            });

        });

    });
    describe('POST /api/tags', function() {
        it('impedisce l\'accesso ad un utente non autorizzato', function (done) {
            login(app, {
                userName: 'mario.rossi',
                password: 'password.mario.rossi'
            }, function(agent) {
                var req = request(app).post('/api/tags');
                agent.attachCookies(req);
                req.send({
                    "name": "testTagStudente" ,
                    "description": "tag di testing"
                }).end(function(err, res) {
                    expect(err).to.not.be.ok;
                    expect(res).to.have.property('status', 401);
                    done();
                });
            })
        });
        it('permette la creazione del tag di test  all\'utente autenticato', function (done) {
            login(app, {
                userName: 'tullio.vardanega',
                password: 'password.tullio.vardanega'
            }, function(agent) {
                var req = request(app).post('/api/tags');
                agent.attachCookies(req);
                req.send({
                    "name": "testTag" ,
                    "description": "tag di testing"
                }).end(function(err, res) {
                    var req = request(app).get('/api/tags/');
                    agent.attachCookies(req);
                    req.end(function(err, res) {
                        expect(res).to.have.property('status', 200);
                        expect(res.body.find(function (tag) {
                            return tag.name === "testTag";
                        }).name).to.eql("testTag");
                        done();
                    });
                });
            });
        });

    });
    describe('PUT /api/tags', function() {
        it('impedisce l\'accesso ad un utente non autorizzato', function (done) {
            login(app, {
                userName: 'mario.rossi',
                password: 'password.mario.rossi'
            }, function(agent) {
                var req = request(app).get('/api/tags');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    var tag = res.body.find(function (tag) {
                        return tag.name === "testTag";
                    });
                    var req = request(app).put('/api/tags/'+tag._id);
                    agent.attachCookies(req);
                    req.send(tag).end(function(err, res) {
                        expect(res).to.have.property('status', 401);
                        done();
                    });
                });
            })
        });
        it('permette la sostituzione del tag di test all\'utente autenticato', function (done) {
            login(app, {
                userName: 'tullio.vardanega',
                password: 'password.tullio.vardanega'
            }, function(agent) {
                var req = request(app).get('/api/tags');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    var tag = res.body.find(function (tag) {
                        return tag.name === "testTag";
                    });
                    tag.name="testTagDopoPut";
                    var req = request(app).put('/api/tags/'+tag._id);
                       agent.attachCookies(req);
                       req.send(tag).end(function(err, res) {
                           expect(res).to.have.property('status', 200);
                           var req = request(app).get('/api/tags/');
                           agent.attachCookies(req);
                           req.end(function(err, res) {
                               expect(res).to.have.property('status', 200);
                               expect(res.body.find(function (tag) {
                                   return tag.name === "testTagDopoPut";
                               }).name).to.eql("testTagDopoPut");
                               done();
                           });
                       });
                });
            });
        });

    });
    describe('DELETE /api/tags', function() {
        it('impedisce l\'accesso ad un utente non autorizzato', function (done) {
            login(app, {
                userName: 'mario.rossi',
                password: 'password.mario.rossi'
            }, function(agent) {
                var req = request(app).get('/api/tags');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    var tag = res.body.find(function (tag) {
                        return tag.name === "testTagDopoPut";
                    });
                    var req = request(app).delete('/api/tags/'+tag._id);
                    agent.attachCookies(req);
                    req.send(tag).end(function(err, res) {
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
                var req = request(app).get('/api/tags');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    var tag = res.body.find(function (tag) {
                        return tag.name === "testTagDopoPut";
                    });
                    //richiesta di cancellazione
                    var req = request(app).delete('/api/tags/'+tag._id);
                    agent.attachCookies(req);
                    req.end(function(err, res) {
                        expect(res).to.have.property('status', 200);
                        // richiesta della verifica della avvenuta cancellazione
                        var req = request(app).get('/api/tags/');
                        agent.attachCookies(req);
                        req.end(function(err, res) {
                            expect(res).to.have.property('status', 200);
                            expect(res.body.find(function (tag) {
                                return tag.name === "testTagDopoPut";
                            })).to.eql(undefined);
                            done();
                        });
                    });
                });
            });
        });

        it('non deve permettere la cancellazione di un tag usato da una domanda o questionario', function (done) {

            login(app, {
                userName: 'tullio.vardanega',
                password: 'password.tullio.vardanega'
            }, function(agent) {

                //richiesta per ottenere id del tag che si vuole cancellare
                var req = request(app).get('/api/tags');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    var tag = res.body.find(function (tag) {
                        return tag.name === "Informatica";
                    });

                    //richiesta di cancellazione
                    var req = request(app).delete('/api/tags/'+tag._id);
                    agent.attachCookies(req);
                    req.end(function(err, res) {
                        expect(res).to.have.property('status', 400);

                        // richiesta della verifica della avvenuta cancellazione
                        var req = request(app).get('/api/tags/');
                        agent.attachCookies(req);
                        req.end(function(err, res) {
                            expect(res).to.have.property('status', 200);
                            var oldTag = res.body.find(function (tag) {
                                return tag.name === "Informatica";
                            });
                            expect(oldTag).to.have.property('name');
                            expect(oldTag).to.have.property('description');
                            done();
                        });
                    });

                });

            });

        });

    });

});
