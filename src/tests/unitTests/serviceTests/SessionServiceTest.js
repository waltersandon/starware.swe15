/**
 * Created by igor on 22/04/16.
 */
var expect = require('chai').expect;
var request = require('superagent');
var testSubject = require('../../../api/service/SessionService.js');
describe('Testing di SessionService', function() {
    var url = 'http://localhost:3000/';
    it('Deve creare una nuova sessione', function () {
        //TODO
        var user = {};
        request.post(url+'api/session').send({
            'password': "password",
            'userName': "mrossi"
        }).accept('json').end(function(err, res){
            if(!err) user=res;
            expect()
        });
    });
    it('Gestione Errori: deve rilevare una sessione non valida', function () {
        //TODO
    });
    it('Deve eliminare una sessione esistente', function () {
        //TODO
    });
    it('Deve segnalare eliminazione sessione esistente', function () {
        //TODO
    });
});