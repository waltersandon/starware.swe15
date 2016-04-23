var express = require('express');

var Configuration = require('./../app/Configuration');

var UserService = require('../services/UserService');
var QuestionService = require('../services/QuestionService');
var QuestionnaireService = require('../services/QuestionnaireService');
var SessionService = require('../services/SessionService');
var TagService = require('../services/TagService');
var RoleService = require('../services/RoleService');

/**
 * Classe che si occupa di smistare la richiesta in base all’URI ricevuto e ad invocare l’opportuno servizio
 * @param auth
 * @param error
 * @constructor
 */
function Router(auth, error) {

    this.router = express.Router();
    this.sessionService = new SessionService();
    this.userService = new UserService();
    this.questionService = new QuestionService();
    this.questionnaireService = new QuestionnaireService();
    this.tagService = new TagService();
    this.roleService = new RoleService();

    //login & logout
    this.router.post("/session",this.sessionService.login);
    this.router.delete("/session",this.sessionService.logout);

    //Routing user requests
    this.router.get('/users',auth.requireAdmin,this.userService.get);
    this.router.get('/users/me',auth.requireUser, this.userService.getMe);
    this.router.get('/users/:id',auth.requireAdmin,this.userService.getByID);
    this.router.post('/users',auth.requireUser,this.userService.new);
    this.router.post('/users/me',auth.requireUser,this.userService.modifyMe);
    this.router.post('/users/:id',auth.requireUser,this.userService.modify);
    this.router.delete('/users/:id',auth.requireAdmin,this.userService.delete);

    //Routing question request
    this.router.get('/questions',auth.requireTeacher,this.questionService.get);
    this.router.get('/questions/:id',auth.requireUser,this.questionService.getByID);
    this.router.post('/questions',auth.requireTeacher,this.questionService.new);
    this.router.put('/questions/:id',auth.requireTeacher,this.questionService.modify);
    this.router.delete('/questions/:id',auth.requireTeacher,this.questionService.delete);

    //Routing questionnaire requests
    this.router.get('/questionnaires',auth.requireUser,this.questionnaireService.get);
    this.router.get('/questionnaires/:id',auth.requireUser,this.questionnaireService.getByID);
    this.router.post('/questionnaires',auth.requireTeacher,this.questionnaireService.new);
    this.router.put('/questionnaires/:id',auth.requireTeacher,this.questionnaireService.modify);
    this.router.delete('/questionnaires/:id',auth.requireTeacher,this.questionnaireService.delete);

    //Routing subject requests
    this.router.get('/tags',auth.requireUser,this.tagService.get);
    this.router.get('/tags/:id',auth.requireUser,this.tagService.getByID);
    this.router.post('/tags',auth.requireTeacher,this.tagService.new);
    this.router.put('/tags/:id',auth.requireTeacher,this.tagService.modifyTag);
    this.router.delete('/tags/:id',auth.requireTeacher,this.tagService.deleteTag);

    //Routing role requests
    this.router.get('/roles',auth.requireAdmin,this.roleService.get);
    this.router.get('/roles/:id',auth.requireUser,this.roleService.getByID);

    // Error handler
    this.router.use(error.handler);
    
}

module.exports = Router;