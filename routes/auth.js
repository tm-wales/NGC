/*
 * Module dependencies.
 * ------------------------------------------------
*/
    const express = require("express")
        , passport   = require("passport")
        , LocalStrategy = require("passport-local")
/*
* Module declarations
* ------------------------------------------------
*/
    const router  = express.Router({mergeParams: true});

/*
* Main code
* ------------------------------------------------
*/
    /* Routes - Login (post). */
    /* ---------------------------------------- */
    router.post('/login', function(req, res) {
        let urlHost = req.protocol + '://' + req.get('host');

        passport.authenticate('local', function(err, user) {
            if (req.xhr) {
                if (err)   { return res.json({ success: false, error: err.message }); }
                if (!user) { return res.json({ success: false, error: "Invalid Login" }); }
                req.login(user, {}, function(err) {
                    if (err) { return res.json( { success: false, error:err } ); }
                    if ( req.body.rememberme ) { req.session.cookie.maxAge = 30*24*60*60*1000 } // 30 days

                    return res.json(
                        { user: {
                                id: req.user.id,
                                joined: req.user.joined,
                        },
                        url: urlHost + "/admin",
                        success: true
                    });
                });
            } else {
                if (err)   { return res.redirect('/'); }
                if (!user) { return res.redirect('/'); }
                req.login(user, {}, function(err) {
                if (err) { return res.redirect('/'); }
                if ( req.body.rememberme ) { req.session.cookie.maxAge = 30*24*60*60*1000 } // 30 days
                return res.redirect('/admin');
                });
            }
        })(req, res);
    });

    /* Routes - Logout (get). */
    /* ---------------------------------------- */
    router.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
    });

// * --------------------------------------------

/*
 * Module export.
 * ------------------------------------------------
*/
    module.exports = router;