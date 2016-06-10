/**
 * @file UserService.js
 * @date 18/04/2016
 * @version 2.0
 * @author Andrea Venier
 *
 */

/*!
 * @class   UserService
 * @details Classe che si occupa della operazioni di inserimento, modifica e
 *          rimozione di account utenti, sfruttando la classe server::data::User
 *          per accedere ai dati persistenti nel database.
 * @par Usage
 * Fornisce i dati personali degli utenti a chi ne ha il permesso di accesso ed
 * esegue operazioni di aggiunta, modifica, rimozione e cambio di ruolo per gli
 * utenti del sistema.
 */

var User = require('./../data/User');
var Role = require('./../data/Role');

/*!
 * @details costruttore della classe
 */
function UserService() {}

/*!
 * @details metodo che invia al client la lista degli utenti attraverso un
 *          Json
 * @param[in]  req  questo oggetto rappresenta la richiesta arrivata al
 *                   server che il metodo deve gestire
 * @param[in]  res  questo oggetto rappresenta la risposta che il server
 *                   dovrà inviare al termine dell'elaborazione
 * @param[in]  next questo parametro rappresenta la callback che il metodo
 *                   dovrà chiamare al termine dell’elaborazione
 */
UserService.prototype.get = function(req, res, next) {
    this.query = { isActive: true };
    if (req.query.userName){
        this.rex = "\\b("+req.query.userName+")\\b";
        this.query.userName = new RegExp(this.rex, 'i');
    }
    if (req.query.fullName){
        this.rex = req.query.fullName;
        this.query.fullName = new RegExp(this.rex, 'i');
    }
    User.find(this.query).exec(function(err, users) {
        if (err) next(400);
        else {res.json(users);}
    });
};

/*!
 * @details metodo che ritorna al client un Json contenente l'utente
 *          specifico identificato nella richiesta http
 * @param[in]  req  questo oggetto rappresenta la richiesta arrivata al
 *                   server che il metodo deve gestire
 * @param[in]  res  questo oggetto rappresenta la risposta che il server
 *                   dovrà inviare al termine dell'elaborazione
 * @param[in]  next questo parametro rappresenta la callback che il metodo
 *                   dovrà chiamare al termine dell’elaborazione
 */
UserService.prototype.getByID = function(req, res, next){
    User.findById(req.params.id, function(err, user) {
        if (err) return next(400);
        if (!user) return next(404);
        if (user && !user.isActive)
            return next(404);
        res.json(user);
    });
};

/*!
 * @details metodo che restituisce al client un Json con i dati relativi
 *          all'utente loggato
 * @param[in]  req  questo oggetto rappresenta la richiesta arrivata al
 *                   server che il metodo deve gestire
 * @param[in]  res  questo oggetto rappresenta la risposta che il server
 *                   dovrà inviare al termine dell'elaborazione
 * @param[in]  next questo parametro rappresenta la callback che il metodo
 *                   dovrà chiamare al termine dell’elaborazione
 */
UserService.prototype.getMe = function(req, res, next){
    User.findById(req.session.user._id, function(err, user) {
        if (err) next(400);
        else if (!user) next(404);
        else {res.json(user);}
    });
};

/*!
 * @details metodo che aggiunge un nuovo utente al database
 * @param[in]  req  questo oggetto rappresenta la richiesta arrivata al
 *                   server che il metodo deve gestire
 * @param[in]  res  questo oggetto rappresenta la risposta che il server
 *                   dovrà inviare al termine dell'elaborazione
 * @param[in]  next questo parametro rappresenta la callback che il metodo
 *                   dovrà chiamare al termine dell’elaborazione
 */
UserService.prototype.new = function(req, res, next) {
    Role.findOne({ name: 'student' }).exec(function(err, role)  {
        if (err) return next(400);
        var newUser = new User({
            fullName: req.body.fullName,
            userName: req.body.userName,
            password: req.body.password,
            role: role._id
        });
        newUser.save(function(err, user) {
            if (err) next(err);
            else {res.send();}
        });
    });
};

/*!
 * @details metodo che modifica i dati dell'utente specificato nella
 *          richiesta http
 * @param[in]  req  questo oggetto rappresenta la richiesta arrivata al
 *                   server che il metodo deve gestire
 * @param[in]  res  questo oggetto rappresenta la risposta che il server
 *                   dovrà inviare al termine dell'elaborazione
 * @param[in]  next questo parametro rappresenta la callback che il metodo
 *                   dovrà chiamare al termine dell’elaborazione
 */
UserService.prototype.modify = function(req, res, next){
    Role.findById(req.session.user.role, function(err, userRole) {
        if (err) return next(err);
        if (!userRole) return next(400);
        if (req.session.user._id === req.params.id)
            return next(400);
        Role.findById(req.body.role, function(err, newRole) {
            if (err) next(err);
            if (!newRole) return next(400);
            if (newRole.greaterThan(userRole) || newRole.equalTo(userRole))
                return next(401);
            User.findByIdAndUpdate(req.params.id, {
                role: req.body.role
            }, function (err, user) {
                if (err) return next(err);
                if (!user) return next(404);
                res.send();
            });
        });
    });
};

/*!
 * @details metodo che modifica i dati dell'utente connesso al sistema se
 *          presente
 * @param[in]  req  questo oggetto rappresenta la richiesta arrivata al
 *                   server che il metodo deve gestire
 * @param[in]  res  questo oggetto rappresenta la risposta che il server
 *                   dovrà inviare al termine dell'elaborazione
 * @param[in]  next questo parametro rappresenta la callback che il metodo
 *                   dovrà chiamare al termine dell’elaborazione
 */
UserService.prototype.modifyMe = function(req, res, next){
    if (req.body.fullName || req.body.userName) {
        User.findByIdAndUpdate(req.session.user._id, { 
            fullName: req.body.fullName,
            userName: req.body.userName
        }, function(err, user) {
            if(err) next(err);
            else { res.send(); }
        });
    } else if (req.body.oldPassword && req.body.newPassword) {
        User.findById(req.session.user._id, function(err, user) {
            if (err) next(400);
            else if (!user) next(404);
            else {
                if (!user.hasPassword(req.body.oldPassword))
                    next(401);
                else{
                    user.password = req.body.newPassword;
                    user.save(function(err) {
                        if(err) next(err);
                        else if (!user) next(404);
                        else {res.send();}
                    });
                }
            }
        });
    }
    else{
        next(400);
    }
};

/*!
 * @details metodo che elimina un utente dal database
 * @param[in]  req  questo oggetto rappresenta la richiesta arrivata al
 *                   server che il metodo deve gestire
 * @param[in]  res  questo oggetto rappresenta la risposta che il server
 *                   dovrà inviare al termine dell'elaborazione
 * @param[in]  next questo parametro rappresenta la callback che il metodo
 *                   dovrà chiamare al termine dell’elaborazione
 */
UserService.prototype.delete = function(req, res, next){
    User.findByIdAndUpdate(req.params.id, {
        $set: { isActive: false }
    }, { new: true }, function(err, user) {
        if (err) return next(400);
        res.send();
    });
};

module.exports = UserService;