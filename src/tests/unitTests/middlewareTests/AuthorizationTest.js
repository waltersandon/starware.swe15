/**
 * Created by igor on 21/04/16.
 * 19.TU
 */
var expect = require('chai').expect;
var testSubject = require('../../../api/middleware/Authorization.js');
describe('Authorization check', function() {
    var check = new testSubject();
    describe('richiesta authorization utente logato', function() {
        describe('controllo requireUser', function() {
            it('deve eseguire callback dato request con i permessi giusti', function() {
                var res=false;
                var req= {'session' :{ 'role' : "User"} };
                check.requireUser(req,res,function(){res=true;});
                    expect(res).to.equal(true);
            });
        });
        describe('controllo requireTeacher', function() {
            it('deve eseguire callback dato request con i permessi giusti', function() {
                var res=false;
                var req= {'session' :{ 'role' : "Teacher"} };
                check.requireTeacher(req,res,function(){res=true;});
                expect(res).to.equal(true);
            });
        });
        describe('controllo requireAdmin', function() {
            it('deve eseguire callback dato request con i permessi giusti', function() {
                var res=false;
                var req= {'session' :{ 'role' : "Admin"} };
                check.requireAdmin(req,res,function(){res=true;});
                expect(res).to.equal(true);
            });
        });
        describe('controllo requireSuperAdmin', function() {
            it('deve eseguire callback dato request con i permessi giusti', function() {
                var res=false;
                var req= {'session' :{ 'role' : "SuperAdmin"} };
                check.requireSuperAdmin(req,res,function(){res=true;});
                expect(res).to.equal(true);
            });
        });
    });
    describe('richiesta authorization utente non logato', function() {
        //Mock dell oggetto Request e funzione del callback  TODO
        describe('controllo requireUser', function() {
            it('deve rispondere con errore 401', function() {
                var res=false;
                var req= {'session' : null };
                var err= {};
                check.requireUser(req,res,function(err){ if(err.code === 401 ) res=true;});
                expect(res).to.equal(true);
            });
        });
        describe('controllo requireTeacher', function() {
            it('deve rispondere con errore 401', function() {
                //next({code:401, error:"Utente non autorizzato"});
                var res=false;
                var req= {'session' : null };
                check.requireTeacher(req,res,function(){ if(err.code === 401 ) res=true;});
                expect(res).to.equal(true);
            });
        });
        describe('controllo requireAdmin', function() {
            it('deve rispondere con errore 401', function() {
                var res=false;
                var req= {'session' : null };
                check.requireAdmin(req,res,function(err){ if(err.code === 401 ) res=true;});
                expect(res).to.equal(true);
            });
        });
        describe('controllo requireSuperAdmin', function() {
            it('deve rispondere con errore 401', function() {
                var res=false;
                var req= {'session' : null };
                check.requireSuperAdmin(req,res,function(err){ if(err.code === 401 ) res=true;});
                expect(res).to.equal(true);
            });
        });

    });
});