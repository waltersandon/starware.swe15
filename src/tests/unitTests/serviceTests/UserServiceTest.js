var expect = require('chai').expect;
var User = require('../../../api/data/User');
var Role = require('../../../api/data/Role');
var db = require('../../utils/DatabaseSetup');

var UserService = require('../../../api/service/UserService');
var RequestMock = require('../middlewareTests/mocks/RequestMock');
var ResponseMock = require('../middlewareTests/mocks/ResponseMock');
describe('Testing di UserService', function() {

    /* Hook eseguito prima di questa batteria di test
     */
    before(function(done) {
        db.databaseConnect();
        done();
    });

    /* Hook eseguito prima di ogni singolo test
     */
    beforeEach(function(done) {
        var studentRole = new Role({ name: 'student' });
        var aStudent1 = new User({
            userName: 'username1',
            fullName: 'User Name 1',
            password: 'password1',
            role: studentRole._id
        });
        var aStudent2 = new User({
            userName: 'username2',
            fullName: 'User Name 2',
            password: 'password2',
            role: studentRole._id
        });
        var aStudent3 = new User({
            userName: 'username3',
            fullName: 'User Name 3',
            password: 'password3',
            role: studentRole._id
        });
        db.databaseSetup([
            studentRole,
            aStudent1,
            aStudent2,
            aStudent3
        ], done);
    });

    it('Deve creare un utente', function (done) {
        var userService = new UserService();
        var request = new RequestMock();
        request.body = {
            userName: 'username-test',
            fullName: 'User Name Test',
            password: 'password-test'
        };
        var response = new ResponseMock();
        response.onDone = function() {
            User.findOne({ userName: request.body.userName }).exec(function(err, user) {
                expect(err).to.be.equal(null);
                expect(response.next).to.be.equal(null);
                expect(user.userName).to.be.equal(request.body.userName);
                expect(user.fullName).to.be.equal(request.body.fullName);
                expect(user.hasPassword(request.body.password)).to.be.equal(true);
                done();
            });
        };
        userService.new(request, response, response.next);
    });

    it('Deve ottenere un utente per ID', function () {
        //TODO
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