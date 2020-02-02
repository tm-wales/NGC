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
         ,caseStudy = require("../models/casestudy")
         ,services = require("../models/service")
         ,news  = require("../models/news")
/*
* Main code
* ------------------------------------------------
*/
    /* Routes - Cases api. */
    /* ---------------------------------------- */
    router.get("/cases/api/:service/:sector/", function(req, res) {
        console.log("api triggered")
        let service = req.params.service
        let sector = req.params.sector
        let condition = {};

        if(sector !== "All") {
            condition.sector = sector;
        }

        if(service !== "All") {
            // services.findOne({serviceName: service}, function(err, selectedService){
            //     serviceID = String(selectedService._id);

            //     condition.service = { "$in" : [services]};
            // });
            condition.service = { "$in" : [service]};
        }

        caseStudy.find(condition).sort({createDate: -1}).exec(function(err, cases) {
            res.render("case/api/cases",{cases:cases});
        });
    });

    router.get("/news/api/:category", function(req, res) {
        console.log("api triggered")
        let category = req.params.category
        let condition = {};

        if(category !== "All") {
            condition.category = category;
        }

        news.find(condition).sort({createDate: -1}).exec(function(err, selectedNews) {
            res.render("news/api/news",{news:selectedNews});
        });
    });
// * --------------------------------------------

/*
 * Module export.
 * ------------------------------------------------
*/
    module.exports = router;