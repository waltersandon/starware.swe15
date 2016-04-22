/**
 * Created by igor on 21/04/16.
 * 18.TU
 */
var testSubject = require('../../../api/middleware/Router.js');
describe('Router check', function() {
    //Mock dell oggetto ErrorHandler  TODO
    describe('richiesta auth corretta', function() {
        //Mock dell oggetto Autorization  TODO
        describe('user', function() {
            it('deve permettere di recuparere un questionario da eseguire', function() {
                //TODO
            });
         });
        describe('teacher', function() {
            it('deve permettere di fare modifica questionario', function() {
                //TODO
            });
            it('deve permettere di fare cancella questionario', function() {
                //TODO
            });
            it('deve permettere di fare crea questionario', function() {
                //TODO
            });
            it('deve permettere di fare modifica domanda', function() {
                //TODO
            });
            it('deve permettere di fare cancella domanda', function() {
                //TODO
            });
            it('deve permettere di fare crea domanda', function() {
                //TODO
            });

            it('deve permettere di fare modifica argomento', function() {
                //TODO
            });
            it('deve permettere di fare cancella argomento', function() {
                //TODO
            });
            it('deve permettere di fare crea argomento', function() {
                //TODO
            });
        });
        describe('admin', function() {
            it('deve permetter di cambiare ruolo di un utente', function() {
                //TODO
            });
        });
        
    });
    describe('richiesta auth errata', function() {
        //Mock dell oggetto Autorization  TODO
        describe('user', function() {
           it('deve impedire di fare modifica questionario', function() {
                //TODO
            });
            it('deve impedire di fare cancella questionario', function() {
                //TODO
            });
            it('deve impedire di fare crea questionario', function() {
                //TODO
            });
            it('deve impedire di fare modifica domanda', function() {
                //TODO
            });
            it('deve impedire di fare cancella domanda', function() {
                //TODO
            });
            it('deve impedire di fare crea domanda', function() {
                //TODO
            });

            it('deve impedire di fare modifica argomento', function() {
                //TODO
            });
            it('deve impedire di fare cancella argomento', function() {
                //TODO
            });
            it('deve impedire di fare crea argomento', function() {
                //TODO
            });
        });
        describe('teacher', function() {
            it('deve impedire di fare modifiche ai ruoli dei utenti', function() {
                //TODO
            });
        });

    });
});