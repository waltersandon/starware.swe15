var User = require('./../data/User');
var UserCheck = require('./../validator/UserCheck');
var Role = require('./../data/Role');

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
            if (!user)
                return res.status(404).json({ error: 'Utente non esistente' });
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
            if (!user)
                return res.status(404).json({ error: 'Utente non esistente' });
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
        Role.findOne({ name: 'student' }).exec(function(err, role) {
            var check = new UserCheck();
            if (!check.checkFullName(req.body.fullName))
                return res.status(400).json({ error: 'Nome completo non valido' });
            if (!check.checkUserName(req.body.userName))
                return res.status(400).json({ error: 'Nome utente non valido' });
            if (!check.checkUniqueUserName(req.body.userName))
                return res.status(400).json({ error: 'Nome utente già esistente' });
            if (!check.checkPassword(req.body.password))
                return res.status(400).json({ error: 'Password troppo corta' });
            if (!role)
                return res.status(400).json({ error: 'Ruolo non trovato' })
            var user = new User({
                fullName: req.body.fullName,
                userName: req.body.userName,
                password: req.body.password,
                role: role._id
            });
            user.save(function(err) {
                res.sendStatus(200);
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
        User.findByIdAndUpdate(req.params.id, 
            { 
                role: req.body.role.id 
            }, function(err, user) {
                if (!user)
                    return res.status(404).json({ error: 'Utente non esistente' });
                req.sendStatus(200);
            }
        );
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
            User.findByIdAndUpdate(req.session.user._id, 
                { 
                    fullName: req.body.fullName,
                    userName: req.body.userName
                }, function(err, user) {
                    if (!user)
                        return res.status(404).json({ error: 'Utente non esistente' });
                    req.sendStatus(200);
                }
            );
        } else if (req.body.oldPassword || req.body.newPassword) {
            if (!req.session.user.hasPassword(req.body.oldPassword))
                return res.status(400).json({ error: "Password specificata incorretta" });

            var check = new UserCheck();
            if (check.checkPassword(req.body.newPassword))
                return res.status(400).json({ error: "Nuova password non valida" });
            User.findByIdAndUpdate(req.session.user._id, 
                {
                    password: req.body.newPassword
                }, function(err, user) {
                    if (!user)
                        return res.status(404).json({ error: 'Utente non esistente' });
                    req.sendStatus(200);
                }
            );
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
        User.findByIdAndUpdate(req.session.user._id, 
            {
                isActive: false
            }, function(err, user) {
                if (!user)
                    return res.status(404).json({ error: 'Utente non esistente' });
                res.sendStatus(200);
            }
        );
    };

}


module.exports = UserService;