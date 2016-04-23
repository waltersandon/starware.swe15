/**
 * Classe utilizzata per gestire tutti gli errori che vengono generati
 * @constructor
 */
var ErrorHandler = function(res, onSuccess) {
    return function(err, data) {
        if (err) {
            console.error(err);
            res.sendStatus(400);
        } else {
            onSuccess(data);
        }
    };
};

module.exports = ErrorHandler;