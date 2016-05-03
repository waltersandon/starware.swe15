var expect = require('chai').expect;
var request = require('supertest');

var app = require('../../utils/AppUtils').testApp;
var login = require('../../utils/LoginUtils').login;

describe('/api/roles', function() {

    describe('GET /api/roles', function() {

        it("permette la visualizzazione di tutti i ruoli ad un amministratore", function (done) {
            login(app, {
                userName: 'francesco.ranzato',
                password: 'password.francesco.ranzato'
            }, function(agent) {
                var req = request(app).get('/api/roles');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    expect(err).to.not.be.ok;
                    expect(res).to.have.property('status', 200);
                    expect(res.body).to.be.instanceof(Array);
                    expect(res.body.length).to.be.equal(4);
                    expect(res.body[0]).to.have.property('_id');
                    expect(res.body[0]).to.have.property('name');
                    done();
                });
            });
        });

        it("non permette la visualizzazione ad un utente con ruolo inferiore ad amministratore", function (done) {
            login(app, {
                userName: 'tullio.vardanega',
                password: 'password.tullio.vardanega'
            }, function(agent) {
                var req = request(app).get('/api/roles');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    expect(err).to.not.be.ok;
                    expect(res).to.have.property('status', 401);
                    done();
                });
            });
        });

    });

    describe('GET /api/roles/:id', function() {

        it("permette la visualizzazione di un ruolo ad un qualsiasi utente", function (done) {
            login(app, {
                userName: 'mario.rossi',
                password: 'password.mario.rossi'
            }, function(agent) {
                var req = request(app).get('/api/users/me');
                agent.attachCookies(req);
                req.end(function(err, res) {
                    expect(err).to.not.be.ok;
                    expect(res).to.have.property('status', 200);
                    var user = res.body;
    	            var req = request(app).get('/api/roles/'+user.role);
    	            agent.attachCookies(req);
    	            req.end(function(err, res) {
    	                expect(err).to.not.be.ok;
    	                expect(res).to.have.property('status', 200);
    	                expect(res.body).to.have.property('_id');
    	                expect(res.body).to.have.property('name', 'student');
    	                done();
    	            });
                });
            });
        });

    });

});