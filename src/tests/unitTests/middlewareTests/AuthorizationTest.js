/**
 * Created by igor on 21/04/16.
 * 19.TU
 */
var testSubject = require('../../../api/middleware/Authorization.js');
describe('Authorization check', function() {
    //Mock dell oggetto ErrorHandler  TODO
    describe('richiesta authorization utente logato', function() {
        //Mock dell oggetto Request e funzione del callback  TODO
        describe('controllo requireUser', function() {
            it('deve eseguire callback dato request con i permessi giusti', function() {
                //TODO
            });
        });
        describe('controllo requireTeacher', function() {
            it('deve eseguire callback dato request con i permessi giusti', function() {
                //TODO
            });
        });
        describe('controllo requireAdmin', function() {
            it('deve eseguire callback dato request con i permessi giusti', function() {
                //TODO
            });
        });
        describe('controllo requireSuperAdmin', function() {
            it('deve eseguire callback dato request con i permessi giusti', function() {
                //TODO
            });
        });
    });
    describe('richiesta authorization utente non logato', function() {
        //Mock dell oggetto Request e funzione del callback  TODO
        describe('controllo requireUser', function() {
            it('deve rispondere con errore 200', function() {
                //TODO
            });
        });
        describe('controllo requireTeacher', function() {
            it('deve rispondere con errore 200', function() {
                //TODO
            });
        });
        describe('controllo requireAdmin', function() {
            it('deve rispondere con errore 200', function() {
                //TODO
            });
        });
        describe('controllo requireSuperAdmin', function() {
            it('deve rispondere con errore 200', function() {
                //TODO
            });
        });

    });
});