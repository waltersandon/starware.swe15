var expect = require('chai').expect;
var request = require('supertest');

var app = require('../../utils/AppUtils').testApp;
var login = require('../../utils/LoginUtils').login;


describe('GET /api/users', function() {

    it('impedisce l\'accesso ad un utente non autenticato', function (done) {
        request(app)
            .get('/api/users')
            .end(function(err, res) {
                expect(err).to.not.be.ok;
                expect(res).to.have.property('status', 401);
                done();
            });
    });

    it('fornisce la lista degli utenti ad un proprietario', function (done) {
        login(app, {
            userName: 'gregorio.piccoli',
            password: 'password.gregorio.piccoli'
        }, function(agent) {
            var req = request(app).get('/api/users');
            agent.attachCookies(req);
            req.end(function(err, res) {
                expect(err).to.not.be.ok;
                expect(res).to.have.property('status', 200);
                expect(res.body).to.be.instanceof(Array);
                expect(res.body).to.have.length.above(0);
                done();
            });
        });
    });

});

describe('GET /api/users/me', function() {

    it("restituisce l'utente autenticato", function(done) {
        login(app, {
            userName: 'mario.rossi',
            password: 'password.mario.rossi'
        }, function(agent) {
            var req = request(app).get('/api/users/me');
            agent.attachCookies(req);
            req.end(function(err, res) {
                expect(err).to.not.be.ok;
                expect(res).to.have.property('status', 200);
                expect(res.body).to.have.property('userName', 'mario.rossi');
                expect(res.body).to.have.property('fullName', 'Mario Rossi');
                done();
            });
        });
    });

});

describe('GET /api/users/:id', function() {

    it("restituisce l'utente specificato ad un proprietario", function(done) {
        login(app, {
            userName: 'gregorio.piccoli',
            password: 'password.gregorio.piccoli'
        }, function(agent) {
            var req = request(app).get('/api/users');
            agent.attachCookies(req);
            req.end(function(err, res) {
                var testUser = res.body[0];
                var req = request(app).get('/api/users/' + testUser._id);
                agent.attachCookies(req);
                req.end(function(err, res) {
                    expect(err).to.not.be.ok;
                    expect(res).to.have.property('status', 200);
                    expect(res.body).to.have.property('userName', testUser.userName);
                    expect(res.body).to.have.property('fullName', testUser.fullName);
                    done();
                });
            });
        });
    });

});

describe('POST /api/users', function() {

    it("registra un nuovo utente", function(done) {
        var testUser = {
            userName: 'utente.test.1',
            fullName: 'Utente Test',
            password: 'password.utente.test.1'
        };
        request(app).post('/api/users').send(testUser).end(function(err, res) {
            expect(err).to.not.be.ok;
            expect(res).to.have.property('status', 200);
            login(app, {
                userName: testUser.userName,
                password: testUser.password
            }, function(agent) {
                var req = request(app).get('/api/users/me');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    expect(err).to.not.be.ok;
                    expect(res).to.have.property('status', 200);
                    expect(res.body).to.have.property('userName', testUser.userName);
                    expect(res.body).to.have.property('fullName', testUser.fullName);
                    done();
                });
            });
        });
    });

    it("non registra un utente con nome utente troppo corto", function(done) {
        var testUser = {
            userName: 'ute',
            fullName: 'Utente Test',
            password: 'password.utente.test.2'
        };
        request(app).post('/api/users').send(testUser).end(function(err, res) {
            expect(err).to.not.be.ok;
            expect(res).to.have.property('status', 400);
            done();
        });
    });

    it("non registra un utente con password troppo corta", function(done) {
        var testUser = {
            userName: 'utente.test.2',
            fullName: 'Utente Test',
            password: 'pass'
        };
        request(app).post('/api/users').send(testUser).end(function(err, res) {
            expect(err).to.not.be.ok;
            expect(res).to.have.property('status', 400);
            done();
        });
    });

    it("non registra un utente con nome completo troppo corto", function(done) {
        var testUser = {
            userName: 'utente.test.2',
            fullName: 'U',
            password: 'password.utente.test.2'
        };
        request(app).post('/api/users').send(testUser).end(function(err, res) {
            expect(err).to.not.be.ok;
            expect(res).to.have.property('status', 400);
            done();
        });
    });

});

describe('POST /api/users/me', function() {

    it("deve permettere la modifica dei dati personali", function(done) {
        login(app, {
            userName: 'utente.test.1',
            password: 'password.utente.test.1'
        }, function(agent) {
            var modifiedData = {
                userName: 'utente.test.1.modified',
                fullName: 'Utente Test 1 Modified'
            };
            var req = request(app).post('/api/users/me').send(modifiedData);
            agent.attachCookies(req);
            req.end(function(err, res) {
                expect(err).to.not.be.ok;
                expect(res).to.have.property('status', 200);
                var req = request(app).get('/api/users/me');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    expect(err).to.not.be.ok;
                    expect(res).to.have.property('status', 200);
                    expect(res.body).to.have.property('userName', modifiedData.userName);
                    expect(res.body).to.have.property('fullName', modifiedData.fullName);
                    done();
                });
            });
        });
    });

    it("deve permettere la modifica della password", function(done) {
        login(app, {
            userName: 'utente.test.1.modified',
            password: 'password.utente.test.1'
        }, function(agent) {
            var req = request(app).post('/api/users/me').send({
                oldPassword: 'password.utente.test.1',
                newPassword: 'password.utente.test.1.modified'
            });
            agent.attachCookies(req);
            req.end(function(err, res) {
                login(app, {
                    userName: 'utente.test.1.modified',
                    password: 'password.utente.test.1'
                }, function(agent) {
                    var req = request(app).get('/api/users/me');
                    agent.attachCookies(req);
                    req.end(function(err, res) {
                        expect(err).to.not.be.ok;
                        expect(res).to.have.property('status', 200);
                        expect(res.body).to.have.property('userName',
                            'utente.test.1.modified');
                        done();
                    });
                });
            });
        });
    });

    it("deve bloccare la modifica della password con password vecchia incorretta", function(done) {
        login(app, {
            userName: 'utente.test.1.modified',
            password: 'password.utente.test.1.modified'
        }, function(agent) {
            var req = request(app).post('/api/users/me').send({
                oldPassword: 'password.utente.test.1.modified.wrong',
                newPassword: 'password.utente.test.1.modified.2'
            });
            agent.attachCookies(req);
            req.end(function(err, res) {
                expect(err).to.not.be.ok;
                expect(res).to.have.property('status', 401);
                done();
            });
        });
    });

});

describe('POST /api/users/:id', function() {

    it("permette la modifica di un ruolo", function (done) {

        // Effettua l'accesso come amministratore
        login(app, {
            userName: 'francesco.ranzato',
            password: 'password.francesco.ranzato'
        }, function(agent) {

            // Ottieni la lista di tutti gli utenti
            var req = request(app).get('/api/users');
            agent.attachCookies(req);
            req.end(function(err, res) {
                expect(err).to.not.be.ok;
                expect(res).to.have.property('status', 200);
                var testUser = res.body.find(function(user) {
                    return user.userName == 'utente.test.1.modified';
                });

                // Ottieni la lista di tutti i ruoli per cercare
                // quello da impostare all'utente
                var req = request(app).get('/api/roles');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    expect(err).to.not.be.ok;
                    expect(res).to.have.property('status', 200);
                    var teacherRole = res.body.find(function(role) {
                        return role.name == 'teacher';
                    });

                    // Richiedi la modifica del ruolo
                    var req = request(app).post('/api/users/' + testUser._id).send({
                        role: teacherRole._id
                    });
                    agent.attachCookies(req);
                    req.end(function(err, res) {
                        expect(err).to.not.be.ok;
                        expect(res).to.have.property('status', 200);

                        // Prova ad ottenere l'utente e verifica che il ruolo
                        // fornito sia quello corretto
                        var req = request(app).get('/api/users/' + testUser._id);
                        agent.attachCookies(req);
                        req.end(function(err, res) {
                            expect(err).to.not.be.ok;
                            expect(res).to.have.property('status', 200);
                            expect(res.body.role.href).to.be.eql(teacherRole._id);
                            done();
                        });
                    });
                });
            });
        });
    });

});

describe('DELETE /api/users/:id', function() {

    it("permette la rimozione di un utente", function (done) {

        // Effettua il login come proprietario
        login(app, {
            userName: 'francesco.ranzato',
            password: 'password.francesco.ranzato'
        }, function(agent) {

            // Ottieni la lista di tutti gli utenti
            var req = request(app).get('/api/users');
            agent.attachCookies(req);
            req.end(function(err, res) {
                expect(err).to.not.be.ok;
                expect(res).to.have.property('status', 200);
                var testUser = res.body.find(function(user) {
                    return user.userName == 'utente.test.1.modified';
                });

                // Richiedi l'eliminazione dell'utente
                var req = request(app).delete('/api/users/' + testUser._id);
                agent.attachCookies(req);
                req.end(function(err, res) {
                    expect(err).to.not.be.ok;
                    expect(res).to.have.property('status', 200);

                    // Prova a richiedere l'utente appena eliminato
                    // e aspettati di non trovarlo
                    var req = request(app).get('/api/users/' + testUser._id);
                    agent.attachCookies(req);
                    req.end(function(err, res) {
                        expect(err).to.not.be.ok;
                        expect(res).to.have.property('status', 404);
                        done();
                    });
                });
            });
        });
    });

});


/*
    this.router.delete('/users/:id',auth.requireAdmin,this.userService.delete);
*/