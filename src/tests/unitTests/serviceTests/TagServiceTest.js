/**
 * Created by igor on 22/04/16.
 */
var expect = require('chai').expect;
var request = require('supertest');
var login = require('./../../utils/LoginUtils').login;
var app = require('../../utils/AppUtils').testApp;

describe('GET /api/tags', function() {
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
        login(app, {
            userName: 'mario.rossi',
            password: 'password.mario.rossi'
        }, function(agent) {
            var req = request(app).get('/api/tags');
            agent.attachCookies(req);
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

});
describe('POST /api/tags', function() {
    it('impedisce l\'accesso ad un utente non autorizzato', function (done) {
        login(app, {
            userName: 'mario.rossi',
            password: 'password.mario.rossi'
        }, function(agent) {
            var req = request(app).post('/api/tags');
            agent.attachCookies(req);
            req.send({
                "name": "testTagStudente" ,
                "description": "tag di testing" ,
                "parent":  null
            }).end(function(err, res) {
                expect(err).to.not.be.ok;
                expect(res).to.have.property('status', 401);
                done();
            });
        })
    });
    it('ritorna la lista dei tags all\'utente autenticato', function (done) {
        login(app, {
            userName: 'tullio.vardanega',
            password: 'password.tullio.vardanega'
        }, function(agent) {
            var req = request(app).post('/api/tags');
            agent.attachCookies(req);
            req.send({
                "name": "testTag" ,
                "description": "tag di testing" ,
                "parent":  null
            }).end(function(err, res) {
                expect(res).to.have.property('status', 200);
                done();
            });
        });
    });

});
describe('PUT /api/tags', function() {
    it('impedisce l\'accesso ad un utente non autorizzato', function (done) {
        login(app, {
            userName: 'mario.rossi',
            password: 'password.mario.rossi'
        }, function(agent) {
            var req = request(app).get('/api/tags');
            agent.attachCookies(req);
            req.end(function(err, res) {
                var tag = res.body.find(function (tag) {
                    return tag.name === "testTag";
                });
                var req = request(app).put('/api/tags/'+tag._id);
                agent.attachCookies(req);
                req.send(tag).end(function(err, res) {
                    expect(res).to.have.property('status', 401);
                    done();
                });
            });
        })
    });
    it('ritorna la lista dei tags all\'utente autenticato', function (done) {
        login(app, {
            userName: 'tullio.vardanega',
            password: 'password.tullio.vardanega'
        }, function(agent) {
            var req = request(app).get('/api/tags');
            agent.attachCookies(req);
            req.end(function(err, res) {
                var tag = res.body.find(function (tag) {
                    return tag.name === "testTag";
                });
                 var req = request(app).put('/api/tags/'+tag._id);
                   agent.attachCookies(req);
                   req.send(tag).end(function(err, res) {
                       expect(res).to.have.property('status', 200);
                       done();
                   });
            });
        });
    });

});
/*
 this.router.put('/tags/:id',auth.requireTeacher,this.tagService.modifyTag);
 this.router.delete('/tags/:id',auth.requireTeacher,this.tagService.deleteTag);
 */