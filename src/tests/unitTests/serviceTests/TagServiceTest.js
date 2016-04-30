/**
 * Created by igor on 22/04/16.
 */
var expect = require('chai').expect;
var request = require('supertest');
var login = require('./../../utils/LoginUtils');
var db = require('../../utils/DatabaseUtils');
var app = require('../../utils/AppUtils').testApp;


describe('GET /api/tags', function() {
    var agent;
    var theAccount = {
        "userName": "tullio.vardanega",
        "password": "password.tullio.vardanega"
    };

    it('impedisce l\'accesso ad un utente non autenticato', function (done) {
        request(app)
            .get('/api/tags')
            .end(function(err, res) {
                expect(err).to.not.be.ok;
                expect(res).to.have.property('status', 401);
                done();
            });
    });
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
describe('POST /api/tags', function() {
    var agent;
    var theAccountTeacher = {
        "userName": "tullio.vardanega",
        "password": "password.tullio.vardanega"
    };
    var theAccountStudent = {
        "userName": "mario.rossi",
        "password": "password.mario.rossi"
    };
    var tagTeacher = {
        "name": "testTag" ,
        "description": "tag di testing" ,
        "parent":  null
    };
    var tagStudente = {
        "name": "testTagStudente" ,
        "description": "tag di testing dello studente" ,
        "parent":  null
    };
    before(function (done) {
        db.databaseSetup;
        login.login(app, theAccountStudent, function (loginAgent) {
            agent = loginAgent;
            done();
        });
        //console.log(agent);

    });
    it('impedisce l\'accesso ad un utente non autorizzato', function (done) {
        var req = request(app).post('/api/tags');
        //console.log(agent);
        agent.attachCookies(req);
        // console.log(req);
        req.send(tagStudente).end(function(err, res) {
            expect(err).to.not.be.ok;
            //console.log(res);
            expect(res).to.have.property('status', 401);

        });
        req = request(app).get('/api/tags');
        agent.attachCookies(req);
        // console.log(req);
        req.end(function(err, res) {
            expect(res).to.have.property('status', 200);
            //console.log(res.body);
            expect(res.body.find(function (tag) {
                return tag.name === "testTagStudente";
            })).to.equal(undefined);
            done();
        });
    });


    before(function (done) {
        db.databaseSetup;
        login.login(app, theAccountTeacher, function (loginAgent) {
            agent = loginAgent;
            done();
        });
        //console.log(agent);

    });
    it('ritorna la lista dei tags all\'utente autenticato', function (done) {
        var req = request(app).post('/api/tags');
        //console.log(agent);
        agent.attachCookies(req);
        // console.log(req);
        req.send(tagTeacher).end(function(err, res) {
            expect(res).to.have.property('status', 200);
        });
        req = request(app).get('/api/tags');
        agent.attachCookies(req);
        // console.log(req);
        req.end(function(err, res) {
            expect(res).to.have.property('status', 200);

            expect(res.body.find(function (tag) {
                return tag.name === "testTag";
            }).name).to.equal("testTag");
            done();
        });
    });

});
/*
 this.router.post('/tags',auth.requireTeacher,this.tagService.new);
 this.router.put('/tags/:id',auth.requireTeacher,this.tagService.modifyTag);
 this.router.delete('/tags/:id',auth.requireTeacher,this.tagService.deleteTag);
 */