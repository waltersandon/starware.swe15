var mongoose
var expect = require('chai').expect;
<<<<<<< HEAD
var testSubject = require('../../../api/service/UserService.js');
var Request = require('./../middlewareTests/mocks/RequestMock');
var Response = require('./../middlewareTests/mocks/ResponseMock');
describe('Testing di UserService', function() {
    var check = new testSubject();
    it('Deve creare un utente', function () {
            var errore = 0;
            var req = new Request();
            req.setBody({fullName: "testName", userName: "userTest", password: "password"});
            var res = new Response();
            check.new(req,res,function(err){errore = err;});
            expect(errore).to.equal(0);
            console.log(res);
            expect(res.response.userName).to.equal("userTest")
        });
        

        it('Deve ottenere un utente per ID', function () {
            /*
             "_id" : 57206dea97cc9105127851ea
             "fullName" : "Mario Rossi"
             "password" : "$2a$10$3b1ONAH9eE/DFFrXqrxrhOw0Hxf1wORW4XwrRjr16i54EETbisjLm"
             "role" : 57206dea97cc9105127851e2
             "userName" : "mrossi"
             "isActive" : true
=======
var User = require('../../../api/data/User');
var Role = require('../../../api/data/Role');
var databaseSetup = require('../../utils/DatabaseSetup');
>>>>>>> naughty

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