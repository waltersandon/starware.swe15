/**
 * Created by igor on 22/04/16.
 */
var expect = require('chai').expect;
var request = require('supertest');

var db = require('../../utils/DatabaseUtils');
var app = require('../../utils/AppUtils').testApp;


describe('GET /api/tags', function() {

    beforeEach(function (done) {
        db.databaseSetup;
        done();
    });
    it('impedisce l\'accesso ad un utente non autenticato', function (done) {
        request(app)
            .get('/api/tags')
            .end(function(err, res) {
                expect(err).to.not.be.ok;
                expect(res).to.have.property('status', 401);
                done();
            });
    });

});
