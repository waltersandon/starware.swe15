/**
 * Created by igor on 22/04/16.
 * 21.TU
 */
var expect = require('chai').expect;
var testSubject = require('../../../api/middleware/ErrorHandler.js');
describe('ErrorHandler check', function() {
    var check = new testSubject();
    it('deve inviare ValidationError passato', function() {
        var res={};
        var err= {code:401, error:"Utente non autorizzato"};
        var req= {};
        check.handler(err,req,res,function(){});
        expect(res.status(400).statusCode).to.equal(400);
    });
    it('deve inviare number error passato', function() {
        //TODO
    });
    it('deve inviare Uknown error passato', function() {
        //TODO
    });

});