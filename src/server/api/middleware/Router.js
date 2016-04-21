/**
 * Created by avenier on 20/03/2016.
 */

var express = require('express');
var session = require('express-session');
var UserService = require('../Services/UserService');
//var db = require('./db');



/**
 * Classe che si occupa di smistare la richiesta in base all’URI ricevuto e ad invocare l’opportuno servizio
 * @param auth
 * @param error
 * @constructor
 */
function Router(auth, error) {

    this.router = express.Router();

    this.userService = new UserService();

    //Sessioni
    this.router.use(session({
        resave: false, // don't save session if unmodified
        saveUninitialized: true, // don't create session until something stored
        secret: 'honkey cat'
    }));

    /**
     * Metodo che invoca il servizio per creare una nuova sessione associata all'utente
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.login = function(req,res,next){
        console.log("login");
        res.write("ciao");
        res.end();
    };

    /**
     * Metodo che invoca il servizio per eliminare la sessione dell'utente
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.logout = function(req,res,next){
        console.log("logout");
    };

    /**
     * Metodo che invoca il servizio per ritornare il questionario specifico richiesto dall'utente
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.getQuestionnaire = function(req,res,next){
        console.log("getQuestionnaire");
    };

    /**
     * Metodo che invoca il servizio per ritornare una lista di questionari
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.getQuestionnaires = function(req,res,next){
        console.log("getQuestionnaires");
    };
    

    /**
     * Metodo che invoca il servizio per creare un nuovo questionario
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.createQuestionnaire = function(req,res,next){
        console.log("createQuestionnaire");
    };

    /**
     * Metodo che invoca il servizio per modificare un questionario specifico
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.modifyQuestionnaire = function(req,res,next){
        console.log("modifyQuestionnaire");
    };

    /**
     * Metodo che invoca il servizio per cancellare un questionario specifico
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.deleteQuestionnaire = function(req,res,next){
        console.log("deleteQuestionnaire");
    };

    /**
     * Metodo che invoca il servizio per ritornare una lista di domande
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.getQuestions = function(req,res,next){
        console.log("getQuestions");
    };

    /**
     * Metodo che invoca il servizio per ritornare una domanda specifica
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.getQuestion = function(req,res,next){
        console.log("getQuestion");
    };

    /**
     * Metodo che invoca il servizio per creare una nuova domanda
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.createQuestion = function(req,res,next){
        console.log("createQuestion");
    };

    /**
     * Metodo che invoca il servizio per modificare una domanda selezionata
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.modifyQuestion = function(req,res,next){
        console.log("modifyQuestion");
    };

    /**
     * Metodo che invoca il servizio per eliminare una domanda selezionata
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.deleteQuestion = function(req,res,next){
        console.log("deleteQuestion");
    };

    /**
     * Metodo che invoca il servizio per ritornare la lista degli argomenti
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.getTags = function(req,res,next){
        console.log("getTags");
    };

    /**
     * Metodo che invoca il servizio per ritornare un argomento specifico
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.getTag = function(req,res,next){
        console.log("getTag");
    };

    /**
     * Metodo che invoca il servizio per creare un nuovo argomento
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.createTag = function(req,res,next){
        console.log("createSubject");
    };

    /**
     * Metodo che invoca il servizio per modificare un argomento specifico
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.modifyTag = function(req,res,next){
        console.log("modifySubject");
    };

    /**
     * Metodo che invoca il servizio per eliminare un argomento specifico
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.deleteTag = function(req,res,next){
        console.log("deleteSubject");
    }

    /**
     * Metodo che invoca il servizio per eliminare un amministratore
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.getRoles = function(req,res,next){
        console.log("getRoles");
    };

    /**
     * Metodo che invoca il servizio per ottenere la lista dei ruoli o il ruolo di un utente specificato
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.getRole = function(req,res,next){
        console.log("getRole");
    };

    //login & logout
    this.router.post("/session",this.login);
    this.router.delete("/session",this.logout);

    //Routing user requests
    this.router.get("/users",auth.requireAdmin,this.userService.getUsers);
    this.router.get('/users/me',auth.requireUser);
    this.router.get('/users/:id',auth.requireAdmin,this.userService.getUser);
    this.router.post('/users',auth.requireUser,this.userService.createUser);
    this.router.post('/users/me',auth.requireUser,this.userService.modifyUser);
    this.router.delete('/users/:id',auth.requireAdmin,this.userService.deleteUser);
    this.router.post('/users/:id',auth.requireAdmin,this.userService.changeRole);

    this.router.get('/questions',auth.requireTeacher,this.getQuestions);
    this.router.get('/questions/:id',auth.requireUser,this.getQuestion);
    this.router.post('/questions',auth.requireTeacher,this.createQuestion);
    this.router.put('/questions/:id',auth.requireTeacher,this.modifyQuestion);
    this.router.delete('/questions/:id',auth.requireTeacher,this.deleteQuestion);

    //Routing questionnaire requests
    this.router.get('/questionnaires',auth.requireUser,this.getQuestionnaires);
    this.router.get('/questionnaires/:id',auth.requireUser,this.getQuestionnaire);
    this.router.post('/questionnaires',auth.requireTeacher,this.createQuestionnaire);
    this.router.put('/questionnaires/:id',auth.requireTeacher,this.modifyQuestionnaire);
    this.router.delete('/questionnaires/:id',auth.requireTeacher,this.deleteQuestionnaire);

    //Routing subject requests
    this.router.get('/tags',auth.requireUser,this.getTags);
    this.router.get('/tags/:id',auth.requireUser,this.getTag);
    this.router.post('/tags',auth.requireTeacher,this.createTag);
    this.router.put('/tags/:id',auth.requireTeacher,this.modifyTag);
    this.router.delete('/tags/:id',auth.requireTeacher,this.deleteTag);

    //Routing question requests
    this.router.get('/roles',auth.requireAdmin,this.getRoles);
    this.router.get('/roles/:id',auth.requireUser,this.getRole);
    
    //Error handler
    this.router.use(error.handler);


}

module.exports = Router;
