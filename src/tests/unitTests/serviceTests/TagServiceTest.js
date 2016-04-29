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
    var tag1 = 	new Tag({name: 'Matematica', description: 'Scienza che si occupa dello studio dei numeri e delle loro relazioni'});
    var tag2 = 	new Tag({name: 'Informatica', description: 'Scienza che si occupa dello studio dei computer'});
    var tag3 = 	new Tag({name: 'Italiano', description: 'Scienza che si occupa dello studio della lingua e grammatica italiana'});
    var tag4 =  new Tag({name: 'SWE', description: 'Scienza che si occupa dello studio della qualità di un SW',parent: tag2._id});
    before(function(done) {
        db.databaseConnect();
        done();
    });

    /* Hook eseguito prima di ogni singolo test
     */
    beforeEach(function(done) {

        db.databaseSetup([
            tag1,
            tag2,
            tag3,
            tag4
        ], done);
    });
        it('Deve creare il tag', function (done) {
            var userService = new TagService();
            var request = new RequestMock();
            request.body = {name: 'Basi Dati', description: 'Scienza che si occupa dello studio dei basi dei dati',parent: tag2._id};
            var response = new ResponseMock();
            response.onDone = function() {
                Tag.findOne({ name: request.body.name }).exec(function(err, tag) {
                    expect(err).to.be.equal(null);
                    expect(response.next).to.be.equal(null);
                    expect(tag.name).to.be.equal(request.body.name);
                    expect(tag.description).to.be.equal(request.body.description);
                    expect(tag.parent).to.eql(request.body.parent);
                    //tag.toJSON().parent.should.eql(request.body.parent);
                    done();
                });
            };
            userService.new(request, response, response.next);
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
