/**
 * Created by igor on 26/04/16.
 */
function AuthorizationMockCorrect() {
    this.requireUser = function(req,res,next){
            next();

    };
    this.requireTeacher = function(req,res,next){
            next();

    };
    this.requireAdmin = function(req,res,next){
            next();

    };
    this.requireSuperAdmin = function(req,res,next){
            next();

    };
}
module.exports = AuthorizationMockCorrect;
