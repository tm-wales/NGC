// all middleware goes here
const middlewareObj = {
    isLoggedIn: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        res.redirect("/");
    }
};

module.exports = middlewareObj