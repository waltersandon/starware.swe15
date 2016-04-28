/**
 * Created by igor on 21/04/16.
 * 19.TU
 */
var expect = require('chai').expect;
var request = require('superagent');
var testSubject = require('../../../api/middleware/Authorization.js');
describe('Authorization check', function() {
    var check = new testSubject();
    var url = 'http://localhost:3000/';
    describe('richiesta authorization utente logato', function() {
        var user = {};
        before(function (done) {


                request.post(url + 'api/session').send({
                    'password': "password",
                    'userName': "mrossi"
                }).accept('json').end(function (err, res) {
                    if (!err) user = res.body;
                });
                done();
            }
        );
        describe('controllo requireUser', function() {
            it('deve eseguire callback dato request con i permessi giusti', function() {
                /*{
                    " _id ": string ,
                    " userName ": string ,
                    " fullName ": string ,
                    " role ": { " href : string }
                }*/

                var res=false;
                var req = {session: user};
                check.requireUser(req,res,function(){res = "permessi giusti";});
                    expect(res).to.equal("permessi giusti");
            });
        });
        describe('controllo requireTeacher', function() {
            it('deve eseguire callback dato request con i permessi giusti', function() {
                var user = {};
                request.post(url+'api/session').send({
                    'password': "password",
                    'userName': "cbianchi"
                }).accept('json').end(function(err, res){
                    if(!err) user=res.body;
                });
                var res=false;
                var req = {session: user};
                check.requireUser(req,res,function(){res = "permessi giusti";});
                expect(res).to.equal("permessi giusti");
            });
        });
        describe('controllo requireAdmin', function() {
            it('deve eseguire callback dato request con i permessi giusti', function() {
                var user = {};
                request.post(url+'api/session').send({
                    'password': "password",
                    'userName': "averdi"
                }).accept('json').end(function(err, res){
                    if(!err) user=res.body;
                });
                var res=false;
                var req = {session: user};
                check.requireUser(req,res,function(){res = "permessi giusti";});
                expect(res).to.equal("permessi giusti");
            });
        });
        describe('controllo requireSuperAdmin', function() {
            it('deve eseguire callback dato request con i permessi giusti', function() {
                var user = {};
                request.post(url+'api/session').send({
                    'password': "password",
                    'userName': "mpastafrolla"
                }).accept('json').end(function(err, res){
                    if(!err) user=res.body;
                });
                var res=false;
                var req = {session: user};
                check.requireUser(req,res,function(){res = "permessi giusti";});
                expect(res).to.equal("permessi giusti");
            });
        });
    });
    describe('richiesta authorization utente non logato', function() {
        //Mock dell oggetto Request e funzione del callback  TODO
        describe('controllo requireUser', function() {
            it('deve rispondere con errore 401', function() {
                var res=false;
                var req= {session: {user: "true"}};
                check.requireUser(req,res,function(err){ res=err;});
                expect(res).to.equal(false);
            });
        });
        describe('controllo requireTeacher', function() {
            it('deve rispondere con errore 401', function() {
                //next({code:401, error:"Utente non autorizzato"});
                var res=false;
                var req= {session: {user: "true"}};
                check.requireUser(req,res,function(err){ res=err;});
                expect(res).to.equal(false);
            });
        });
        describe('controllo requireAdmin', function() {
            it('deve rispondere con errore 401', function() {
                var res=false;
                var req= {session: {user: "true"}};
                check.requireUser(req,res,function(err){ res=err;});
                expect(res).to.equal(false);
            });
        });
        describe('controllo requireSuperAdmin', function() {
            it('deve rispondere con errore 401', function() {
                var res=false;
                var req= {session: {user: "true"}};
                check.requireUser(req,res,function(err){ res=err;});
                expect(res).to.equal(false);
            });
        });

    });
});