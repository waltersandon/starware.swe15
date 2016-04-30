var expect = require('chai').expect;
var request = require('supertest');
var login = require('./../../utils/LoginUtils').login;
var app = require('../../utils/AppUtils').testApp;

describe('GET /api/questions', function() {});
describe('GET /api/questions/:id', function() {});
describe('POST /api/questions', function() {});
describe('PUT /api/questions/:id', function() {});
describe('DELETE /api/questions/:id', function() {});
/*
 this.router.get('/questions',auth.requireTeacher,this.questionService.get);
 this.router.get('/questions/:id',auth.requireUser,this.questionService.getByID);
 this.router.post('/questions',auth.requireTeacher,this.questionService.new);
 this.router.put('/questions/:id',auth.requireTeacher,this.questionService.modify);
 this.router.delete('/questions/:id',auth.requireTeacher,this.questionService.delete);
 */