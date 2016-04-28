/**
 * Created by igor on 22/04/16.
 */
var expect = require('chai').expect;
var request = require('superagent');
var testSubject = require('../../../api/service/UserService.js');
describe('Testing di UserService', function() {
    var check = new testSubject();
    var url = 'http://localhost:3000/';
    it('Deve creare un utente', function () {
            //TODO
            
        });
        

        it('Deve ottenere un utente per ID', function () {
            /*
             "_id" : 57206dea97cc9105127851ea
             "fullName" : "Mario Rossi"
             "password" : "$2a$10$3b1ONAH9eE/DFFrXqrxrhOw0Hxf1wORW4XwrRjr16i54EETbisjLm"
             "role" : 57206dea97cc9105127851e2
             "userName" : "mrossi"
             "isActive" : true

            var id = "57206dea97cc9105127851ea";
            var req = {params: {id: id}};
            var res = {};
            var errore;
            check.getByID(req,res,function(err){errore=err;});
                console.log(res);
                expect(res.fullName).to.equal("Mario Rossi");

*/
        });

        it('Deve modificare un utente', function () {
        //TODO
         });
          it('Deve modificare utente corrente', function () {
        //TODO
            });

        it('Deve eliminare utente', function () {
            //TODO
        });
    });

    describe('Testing gestione errori di UserService', function() {
        it('Gestione Errore: utente richiesto inesistente', function () {
            //TODO
        });
        it('Gestione Errore: ID utente inesistente', function () {
            //TODO
        });
        it('Gestione Errore: modifica utente inesistente', function () {
            //TODO
        });
        it('Gestione Errore: eliminazione utente inesistente', function () {
            //TODO
        });
    });