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
            password: 'password.utente.test'
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
            password: 'password.utente.test'
        };
        request(app).post('/api/users').send(testUser).end(function(err, res) {
            expect(err).to.not.be.ok;
            expect(res).to.have.property('status', 400);
            done();
        });
    });

});

/*
    this.router.post('/users',this.userService.new);
    this.router.post('/users/me',auth.requireUser,this.userService.modifyMe);
    this.router.post('/users/:id',auth.requireAdmin,this.userService.modify);
    this.router.delete('/users/:id',auth.requireAdmin,this.userService.delete);
*/