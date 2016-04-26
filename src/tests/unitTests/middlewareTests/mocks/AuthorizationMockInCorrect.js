/**
 * Created by igor on 26/04/16.
 */
function AuthorizationMockInCorrect() {
    this.requireUser = function(req,res,next){
        next({code:401, error:"Utente non autorizzato"});
    };
    this.requireTeacher = function(req,res,next){
        next({code:401, error:"Utente non autorizzato"});
    };
    this.requireAdmin = function(req,res,next){
        next({code:401, error:"Utente non autorizzato"});
    };
    this.requireSuperAdmin = function(req,res,next){
        next({code:401, error:"Utente non autorizzato"});
    };
}
module.exports = AuthorizationMockInCorrect;
