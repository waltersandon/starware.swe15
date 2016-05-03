var expect = require('chai').expect;
var request = require('supertest');
var superagent = require('superagent');

var app = require('.././AppUtils').testApp;

describe('/api/session', function() {

    describe('POST /api/session', function() {

        it("rifiuta credenziali incorrette", function (done) {
            var agent = superagent.agent();
            request(app)
                .post('/api/session')
                .send({
                    userName: 'gregorio.piccoli',
                    password: 'password.incorretta'
                })
                .end(function (err, res) {
                    agent.saveCookies(res);
                    expect(err).to.not.be.ok;
                    expect(res).to.have.property('status', 401);
                    var req = request(app).get('/api/users/me');
                    agent.attachCookies(req);
                    req.end(function(err, res) {
                        expect(err).to.not.be.ok;
                        expect(res).to.have.property('status', 401);
                        done();
                    });
                });
        });

        it("effettua l'accesso con credenziali corrette", function (done) {
            var agent = superagent.agent();
            request(app)
                .post('/api/session')
                .send({
                    userName: 'gregorio.piccoli',
                    password: 'password.gregorio.piccoli'
                })
                .end(function (err, res) {
                    agent.saveCookies(res);
                    expect(err).to.not.be.ok;
                    expect(res).to.have.property('status', 200);
                    var req = request(app).get('/api/users/me');
                    agent.attachCookies(req);
                    req.end(function(err, res) {
                        expect(err).to.not.be.ok;
                        expect(res).to.have.property('status', 200);
                        expect(res.body).to.have.property('userName', 'gregorio.piccoli');
                        expect(res.body).to.have.property('fullName', 'Gregorio Piccoli');
                        done();
                    });
                });
        });

    });

    describe('DELETE /api/session', function() {

        it("effettua la disconnessione correttamente", function (done) {
            var agent = superagent.agent();
            request(app)
                .post('/api/session')
                .send({
                    userName: 'gregorio.piccoli',
                    password: 'password.gregorio.piccoli'
                })
                .end(function (err, res) {
                    agent.saveCookies(res);
                    expect(err).to.not.be.ok;
                    expect(res).to.have.property('status', 200);
                    var req = request(app).delete('/api/session');
                    agent.attachCookies(req);
                    req.end(function(err, res) {
                        expect(err).to.not.be.ok;
                        expect(res).to.have.property('status', 200);
                        var req = request(app).get('/api/users/me');
                        agent.attachCookies(req);
                        req.end(function(err, res) {
                            expect(err).to.not.be.ok;
                            expect(res).to.have.property('status', 401);
                            done();
                        });
                    });
                });
        });

    });

});