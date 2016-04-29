/**
 * Created by igor on 22/04/16.
 */
var expect = require('chai').expect;
var Tag = require('../../../api/data/Tag');
var Role = require('../../../api/data/Role');
var db = require('../../utils/DatabaseSetup');

var TagService = require('../../../api/service/TagService');
var RequestMock = require('../middlewareTests/mocks/RequestMock');
var ResponseMock = require('../middlewareTests/mocks/ResponseMock');
describe('Testing di TagService', function() {
    /* Hook eseguito prima di questa batteria di test
     */
    before(function(done) {
        db.databaseConnect();
        done();
    });

    /* Hook eseguito prima di ogni singolo test
     */
    beforeEach(function(done) {
        var tag1 = 	new Tag({name: 'Matematica', description: 'Scienza che si occupa dello studio dei numeri e delle loro relazioni'});
        var tag2 = 	new Tag({name: 'Informatica', description: 'Scienza che si occupa dello studio dei computer'});
        var tag3 = 	new Tag({name: 'Italiano', description: 'Scienza che si occupa dello studio della lingua e grammatica italiana'});
        var tag4 =  new Tag({name: 'SWE', description: 'Scienza che si occupa dello studio della qualità di un SW',parent: tag2._id});
        db.databaseSetup([
            studentRole,
            aStudent1,
            aStudent2,
            aStudent3
        ], done);
    });
        it('Deve creare il tag', function () {
            //TODO
        });
   
        it('Deve ottenere un tag per ID', function () {
            //TODO
        });

        it('Deve modificare il tag', function () {
            //TODO
        });
        it('Deve eliminare tag', function () {
            //TODO
        });
    });

    describe('Testing gestione errori di TagService', function() {
        it('Gestione Errore: tag richiesto inesistente', function () {
            //TODO
        });
        it('Gestione Errore: ID tag inesistente', function () {
            //TODO
        });
        it('Gestione Errore: modifica tag inesistente', function () {
            //TODO
        });
        it('Gestione Errore: eliminazione tag inesistente', function () {
            //TODO
        });
    });
