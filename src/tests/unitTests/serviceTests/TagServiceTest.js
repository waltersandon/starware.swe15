/**
 * Created by igor on 22/04/16.
 */
var expect = require('chai').expect;
var request = require('supertest');
var login = require('./../../utils/LoginUtils');
var db = require('../../utils/DatabaseUtils');
var app = require('../../utils/AppUtils').testApp;


describe('GET /api/tags', function() {

    beforeEach(function (done) {
        db.databaseSetup;
        login.login(theAccount, function (loginAgent) {
            agent = loginAgent;
        done();
        });
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
    var agent;
    var theAccount = {
        "userName": "tullio.vardanega",
        "password": "password.tullio.vardanega"
    };
    /*before(function (done) {
            login.login(theAccount, function (loginAgent) {
            agent = loginAgent;
            done();
        });
    });*/
    it('ritorna la lista dei tags all\'utente autenticato', function (done) {
        //console.log(agent.getCookies);
        var req = request(app).get('/api/tags');
        agent.attachCookies(req);
       // console.log(req);
        req.end(function(err, res) {
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
/*
 this.router.get('/tags',auth.requireUser,this.tagService.get);
 this.router.get('/tags/:id',auth.requireUser,this.tagService.getByID);
 this.router.post('/tags',auth.requireTeacher,this.tagService.new);
 this.router.put('/tags/:id',auth.requireTeacher,this.tagService.modifyTag);
 this.router.delete('/tags/:id',auth.requireTeacher,this.tagService.deleteTag);
 */