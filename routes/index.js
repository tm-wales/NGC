/*
 * Module dependencies.
 * ------------------------------------------------
*/
    const express    = require("express")
        , logger     = require("../utils/logger")
        , mailer  = require("../utils/nodemailer")

/*
* Module declarations
* ------------------------------------------------
*/
    const router  = express.Router()
        , Subscription = require("../models/subscription")
        , Service    = require("../models/service")
        , Case       = require("../models/casestudy")
        , Contact    = require("../models/contact")
        , News       = require("../models/news")
/*
* Main code
* ------------------------------------------------
*/
    /* Routes - Landing Page (get). */
    /* ---------------------------------------- */
    router.get("/", function(req, res) {
        Service.find({}).sort({order: 1}).exec(function(err, allServices) {
            if(err) {
                logger.error(err)
            } else {
                Case.find({}).sort({createDate: -1}).limit(6).exec(function(err, allCases) {
                    if(err) {
                        logger.error(err)
                    } else {
                        News.find({}).sort({createDate: -1}).limit(3).exec(function(err, allNews) {
                            if(err) {
                                logger.error(err)
                            } else {
                                res.render("landing", {services:allServices, cases:allCases, news:allNews});
                            }
                        });
                    }
                });
            }
        });
    });

    router.get("/services/:serviceName", function(req, res) {
        let service  = "";
        service = req.params.serviceName;
        service = service.replace("-"," ");

        Service.find({serviceName: service}).sort({order: 1}).exec(function(err, selectedService) {
            console.log(selectedService);
            if(err) {
                logger.error(err)
            } else {
                Service.find({}).sort({order: 1}).exec(function(err, allServices) {
                    console.log(allServices)
                    if(err) {
                        logger.error(err)
                    } else {
                        res.render("services", {selectedService:selectedService[0], allServices:allServices});
                    }
                });
            }
        });
    });

    router.get("/cases/", function(req, res) {
        Service.find({}).sort({order: 1}).exec(function(err, allServices) {
            if(err) {
                logger.error(err)
            } else {
                Case.find({}).sort({createDate: -1}).exec(function(err, allCases) {
                    if(err) {
                        logger.error(err)
                    } else {
                        res.render("case/allcases", {services:allServices, cases:allCases});
                    }
                });
            }
        });
    });

    router.get("/cases/:case", function(req, res) {
        let casestudy  = "";
        casestudy = req.params.case;
        casestudy = casestudy.replace(/-/g," ");
        console.log(casestudy)
        Case.findOne({caseName: casestudy}).populate("service").sort({createDate: -1,"caseContent.order": 1}).exec(function(err, selectedCase) {
            if(err) {
                logger.error(err)
            } else {
                res.render("case/case", {selectedCase:selectedCase});
            }
        });
    });

    router.get("/news/", function(req, res) {
        News.find({}).sort({createDate: -1}).exec(function(err, allNews) {
            if(err) {
                logger.error(err)
            } else {
                News.find({}).distinct("category").exec(function(err, categories) {
                    if(err) {
                        logger.error(err)
                    } else {
                        res.render("news/allnews", {news:allNews, newsCategory:categories});
                    }
                });
            }
        });
    });

    router.get("/news/:newsTitle", function(req, res) {
        let newsItem  = "";
        newsItem = req.params.newsTitle;
        newsItem = newsItem.replace(/-/g," ");

        News.findOne({title: newsItem}).populate("poster").exec(function(err, selectedNews) {
            if(err) {
                logger.error(err)
            } else {
                console.log(selectedNews)
                res.render("news/news", {selectedNews:selectedNews});
            }
        });
    });

    router.post("/newsletter", function(req, res) {
        let data = {
            email: req.body.email,
            createDate: Date.now()
        };
        Subscription.create(data, function(err, newSub) {
            if(err) {
                logger.error(err)
            }
        });

        res.redirect("/");
    });

    router.post("/contact-us", function(req, res) {
        let data = {
            name: req.body.name,
            email: req.body.email,
            telephone: req.body.phone,
            message: req.body.message,
            createDate: Date.now()
        };

        // Store in DB for reference
        Contact.create(data, function(err, newContact) {
            if(err) {
                logger.error(err)
            } else {
                logger.info("Email contact created")
            }
        });

        // Send mail
        let mailOptions = {
            from: data.name + ' <' + data.email + '>',
            to: "info@nurturedlandscapes.co.uk",
            subject: "Contact Request",
            text: `${data.name} (email:${data.email}) (tel:${data.telephone}) says: ${data.message}`,
            html: `${data.name} (email:<a href="emailTo:${data.email}">${data.email}</a>) (tel:<a href="tel:${data.telephone}">${data.telephone}</a>) says: </br>${data.message}`
        };

        mailer.sendMail(mailOptions, function(error, info){
            if (error) {
                logger.error(error)
            } else {
                logger.info("Email Sent")
            }
        });

        res.redirect("/")
    });

    router.get("/terms", function(req, res) {
        res.render("terms");
    });

    router.get("/privacy", function(req, res) {
        res.render("privacy");
    });
// * --------------------------------------------

/*
 * Module export.
 * ------------------------------------------------
*/
    module.exports = router;