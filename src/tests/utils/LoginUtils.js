/**
 * Created by igor on 29/04/16.
 */
var superagent = require('superagent');
var agent = superagent.agent();
var request = require('supertest');
/*var theAccount = {
    "username": "nacho",
    "password": "iamtheluchadore"
};*/

exports.login = function (theAccount, done) {
    request('localhost:3000')
        .post('/api/session')
        .send(theAccount)
        .end(function (err, res) {
            if (err) {
                throw err;
            }
            agent.saveCookies(res);
            //console.log(agent);
            //console.log(res);
            done(agent);
        });
};
