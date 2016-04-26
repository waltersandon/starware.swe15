/**
 * Created by igor on 21/04/16.
 * 18.TU
 */
var expect = require('expect.js');
var request = require('superagent');
var testSubject = require('../../../api/middleware/Router.js');
var AuthorizationCorrect = require('./mocks/AuthorizationMockCorrect');
var AuthorizationInCorrect = require('./mocks/AuthorizationMockInCorrect');
var ErrorHandler = require('./../../../api/middleware/ErrorHandler');
var Questionnaire = require('./../../../api/data/Questionnaire');
var express = require('express');
var fs = require('fs');

var App = require('./../../../api/app/App');
var Loader = require('./mocks/LoaderMock');


describe('Router check', function() {
    var error = new ErrorHandler();
    var url = "http://localhost:3000/";
    describe('richiesta auth corretta', function() {
        var a = new App();
        var auth= new AuthorizationCorrect();
        var l = new Loader(a.config(),auth);
        a.start();
        describe('user', function() {
            it('deve permettere di recuparere un questionario da eseguire', function(done) {
                request.get(url+'/questionnaires').end(function(res) {
                    expect(res).to.exist;
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an(Questionnaire);
                    done();
                });
            });
         });
        describe('teacher', function() {
            it('deve permettere di fare modifica questionario', function(done) {
                request.put(url+'/questionnaires').end(function(res) {
                    expect(res).to.exist;
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an(Questionnaire);
                    done();
                });
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