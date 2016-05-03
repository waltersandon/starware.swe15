var superagent = require('superagent');
var request = require('supertest');

exports.login = function (app, theAccount, done) {
    var agent = superagent.agent();
    request(app)
        .post('/api/session')
        .send(theAccount)
        .end(function (err, res) {
            if (err) {
                throw err;
            }
            agent.saveCookies(res);
            done(agent);
        });
};
