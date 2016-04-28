var mongoose
var expect = require('chai').expect;
var User = require('../../../api/data/User');
var Role = require('../../../api/data/Role');
var databaseSetup = require('../../utils/DatabaseSetup');

var UserService = require('../../../api/service/UserService');
var RequestMock = require('../middlewareTests/mocks/RequestMock');
var ResponseMock = require('../middlewareTests/mocks/ResponseMock');
describe('Testing di UserService', function() {

    it('Deve creare un utente', function (done) {
        var studentRole = new Role({ name: 'student' });
        var aStudent = new User({
            userName: 'username1',
            fullName: 'User Name 1',
            password: 'password1',
            role: studentRole._id
        });
        databaseSetup([
            studentRole,
            aStudent
        ], function() {
            var userService = new UserService();
            var request = new RequestMock();
            request.body = {
                userName: 'username2',
                fullName: 'User Name 2',
                password: 'password2'
            };
            var response = new ResponseMock();
            response.onDone = function() {
                User.find({}).exec(function(err, users) {
                    expect(err).to.be.equal(null);
                    expect(response.next).to.be.equal(null);
                    expect(users[0].userName).to.be.equal('username1');
                    expect(users[1].userName).to.be.equal('username2');
                    done();
                });
            };
            userService.new(request, response, response.next);   
        });
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