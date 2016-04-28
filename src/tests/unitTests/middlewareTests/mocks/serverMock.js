/**
 * Created by igor on 27/04/16.
 */
function makeServer() {
    var express = require('express');
    var app = express();
    app.get('/', function (req, res) {
        res.status(200).send('ok');
    });
    var server = app.listen(3000, function () {
        var port = server.address().port;
        console.log('Example app listening at port %s', port);
    });
    return server;
}
module.exports = makeServer;
