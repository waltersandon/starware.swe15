var expect = require('chai').expect;
var request = require('supertest');

var db = require('../../utils/DatabaseUtils');
var app = require('../../utils/AppUtils').testApp;


describe('GET /api/users', function() {

    beforeEach(db.databaseSetup);

    it('impedisce l\'accesso ad un utente non autenticato', function (done) {
        request(app)
            .get('/api/users')
            .end(function(err, res) {
                expect(err).to.not.be.ok;
                expect(res).to.have.property('status', 401);
                done();
            });
    });

});