var expect = require('chai').expect;
var request = require('supertest');
var login = require('./../../utils/LoginUtils').login;
var app = require('../../utils/AppUtils').testApp;

describe('GET /api/questionnaires', function() {});
describe('GET /api/questionnaires/:id', function() {});
describe('POST /api/questionnaires', function() {});
describe('PUT /api/questionnaires/:id', function() {});
describe('DELETE /api/questionnaires/:id', function() {});

/*
 this.router.get('/questionnaires',auth.requireUser,this.questionnaireService.get);
 this.router.get('/questionnaires/:id',auth.requireUser,this.questionnaireService.getByID);
 this.router.post('/questionnaires',auth.requireTeacher,this.questionnaireService.new);
 this.router.put('/questionnaires/:id',auth.requireTeacher,this.questionnaireService.modify);
 this.router.delete('/questionnaires/:id',auth.requireTeacher,this.questionnaireService.delete);
 */