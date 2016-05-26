var superagent = require('superagent');
var request = require('supertest');
var expect = require('chai').expect;

exports.login = function (app, theAccount, done) {
    var agent = superagent.agent();
    request(app)
        .post('/api/session')
        .send(theAccount)
        .end(function (err, res) {
            if (err) {
                throw err;
            }
            expect(res).to.have.property('status', 200);
            agent.saveCookies(res);
            done(agent);
        });
};
