var Role = require('./../data/Role');

/**
 * Classe che si occupa di smistare la richiesta in base all’URI ricevuto e ad invocare l’opportuno servizio
 * @constructor
 */
function RoleService() {

    /**
     * Metodo che invoca il servizio per ottenere i ruoli presenti
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.get = function(req,res,next){
        Role.find({},function(err,role){
            if(err){
                return next({code:404, error:"Ruoli non trovato"});
            }
            res.send(role);
        });
        console.log("getRoles");
    };


    /**
     * Metodo che invoca il servizio per ottenere il ruolo di un utente specificato
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.getByID = function(req,res,next){
        Role.findById(req.params.id,function(err,role){
            if(err){
                return next({code:404, error:"Ruolo non trovato"});
            }
            res.send(role);
        });
        console.log("getRole");
    };
}


module.exports = RoleService;

