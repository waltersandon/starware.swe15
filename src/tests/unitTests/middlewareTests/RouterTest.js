/**
 * Created by igor on 21/04/16.
 * 18.TU
 */
var expect = require('chai').expect;
var testSubject = require('../../../api/middleware/Router.js');
var AuthorizationCorrect = require('./mocks/AuthorizationMockCorrect');
var AuthorizationInCorrect = require('./mocks/AuthorizationMockInCorrect');
var Router = require('./../../../api/middleware/Router');
var express = require('express');
var session = require('express-session');
var ErrorHandler = require('./../../../api/middleware/ErrorHandler');

describe('Router check', function() {
    var error = new ErrorHandler();
    describe('richiesta auth corretta', function() {
        var authorization = new AuthorizationCorrect();
        var check = new testSubject(authorization, error);
        describe('user', function() {
            it('deve permettere di recuparere un questionario da eseguire', function() {
            expect(check.router.get('/questionnaires'))
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
        var authorization = new AuthorizationInCorrect();
        var check = new testSubject(authorization, error);
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