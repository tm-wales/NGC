/*
 * Module dependencies.
 * ------------------------------------------------
*/
const express = require("express")

/*
* Module declarations
* ------------------------------------------------
*/
    const router  = express.Router()

/*
* Main code
* ------------------------------------------------
*/
    /* Routes - Landing Page (get). */
    /* ---------------------------------------- */
    router.get("*", function(req, res) {
        res.render("ohNo")
    });
// * --------------------------------------------

/*
 * Module export.
 * ------------------------------------------------
*/
    module.exports = router;