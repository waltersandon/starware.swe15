/*!
 * @class   RoleService
 * @details Classe che rappresenta il servizio per la lettura dei ruoli utente,
 *          sfruttando la classe server::data::Role per accedere ai dati
 *          persistenti nel database
 * @par Usage
 * Viene utilizzata per fornire un punto d'accesso per l'elenco di tutti i ruoli
 * dell'applicazione e la lettura di un singolo ruolo
 */

var Role = require('./../data/Role');

/*!
 * @details costruttore della classe
 */
function RoleService() {}

/*!
 * @details metodo che invia al client la lista di tutti i ruoli assumibili
 *          dagli utenti dell'applicazione attraverso un Json
 * @param[in]  req  questo oggetto rappresenta la richiesta arrivata al
 *                   server che il metodo deve gestire
 * @param[in]  res  questo oggetto rappresenta la risposta che il server
 *                   dovrà inviare al termine dell'elaborazione
 * @param[in]  next questo parametro rappresenta la callback che il metodo
 *                   dovrà chiamare al termine dell’elaborazione
 */
RoleService.prototype.get = function(req, res, next){
    Role.find({},function(err, role){
        if (err) next(400);
        else {res.json(role);}
    });
};


/*!
 * @details metodo che ritorna al client un Json contenente il ruolo
 *          specificato nella richiesta http
 * @param[in]  req  questo oggetto rappresenta la richiesta arrivata al
 *                   server che il metodo deve gestire
 * @param[in]  res  questo oggetto rappresenta la risposta che il server
 *                   dovrà inviare al termine dell'elaborazione
 * @param[in]  next questo parametro rappresenta la callback che il metodo
 *                   dovrà chiamare al termine dell’elaborazione
 */
RoleService.prototype.getByID = function(req, res, next){
    Role.findById(req.params.id,function(err,role){
        if (err) next(400);
        else if (!role) next(404);
        else {res.json(role);}
    });
};

module.exports = RoleService;