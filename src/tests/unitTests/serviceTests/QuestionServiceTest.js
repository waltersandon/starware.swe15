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
