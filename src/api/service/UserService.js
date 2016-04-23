var User = require('./../data/User');
var Role = require('./../data/Role');
var ErrorHandler = require('./../middleware/ErrorHandler');

/**
 * Classe che si occupa di smistare la richiesta in base all’URI ricevuto e ad invocare l’opportuno servizio
 * @constructor
 */
function UserService() {

    /**
     * Metodo che invoca il servizio per ritornare la lista degli utenti
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.get = function(req, res, next){
        User.find({}).exec(function(err, users) {
            if (err) next(err);
            res.json(users);
        });
    };

    /**
     * Metodo che invoca il servizio per ritornare un utente specificato dalla variabile id
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.getByID = function(req, res, next){
        User.findById(req.params.id, function(err, user) {
            if (err) next(err);
            if (!user) next(404);
            res.json(user);
        });
    };

    /**
     * Metodo che invoca il servizio per ritornare l'utente loggato
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.getMe = function(req, res, next){
        User.findById(req.session.user._id, function(err, user) {
            if (err) next(err);
            if (!user) next(404);
            res.json(user);
        });
    };

    /**
     * Metodo che invoca il servizio per aggiungere un nuovo utente
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.new = function(req, res, next) {
        Role.findOne({ name: 'student' }).exec(function(err, role)  {
            if (err) next(err);
            var user = new User({
                fullName: req.body.fullName,
                userName: req.body.userName,
                password: req.body.password,
                role: role._id
            });
            user.save(function(err, user) {
                if (err) next(err);
                res.json(user);
            });
        });
    };

    /**
     * Metodo che invoca il servizio per modificare il ruolo dell'utente
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     *
     */
    this.modify = function(req, res, next){
        User.findByIdAndUpdate(req.params.id, { 
            role: req.body.role.id
        }, ErrorHandler(res, function(user) {
            if (!user) next(404);
            res.send();
        }));
    };

    /**
     * Metodo che invoca il servizio per modificare i dati dell'utente autenticato
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     *
     */
    this.modifyMe = function(req, res, next){
        if (req.body.fullName || req.body.userName) {
            User.findByIdAndUpdate(req.session.user._id, { 
                fullName: req.body.fullName,
                userName: req.body.userName
            }, ErrorHandler(res, function(user) {
                res.send();
            }));
        } else if (req.body.oldPassword || req.body.newPassword) {
            if (!req.session.user.hasPassword(req.body.oldPassword))
                next(401);
            User.findByIdAndUpdate(req.session.user._id, {
                password: req.body.newPassword
            }, ErrorHandler(res, function(user) {
                if (!user) next(404);
                req.send();
            }));
        }
    };

    /**
     * Metodo che invoca il servizio per eliminare un utente
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.delete = function(req, res, next){
        User.findByIdAndUpdate(req.session.user._id, {
            isActive: false
        }, ErrorHandler(res, function() {
            if (!user) next(404);
            res.send();
        }));
    };

}

module.exports = UserService;