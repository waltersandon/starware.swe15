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

    it('fornisce la lista degli utenti ad un docente', function (done) {
        login(app, {
            userName: 'alessandro.sperduti',
            password: 'password.alessandro.sperduti'
        }, function(agent) {
            var req = request(app).get('/api/users');
            agent.attachCookies(req);
            req.end(function(err, res) {
                expect(err).to.not.be.ok;
                expect(res).to.have.property('status', 200);
                done();
            });
        })
    });

});