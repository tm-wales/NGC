/*
 * Module dependencies.
 * ------------------------------------------------
*/
    // libs & frameworkds.
    const express    = require('express')
        , session = require('express-session')
        , MongoStore = require('connect-mongo')(session)
        , bodyParser = require("body-parser")
        , mongoose   = require("mongoose")
        , passport   = require("passport")
        , LocalStrategy = require("passport-local")
        , methodOverride = require("method-override")
        , morgan     = require("morgan")
        , logger     = require("./utils/logger")
        , back       = require("express-back");
    // Models
    const User       = require("./models/user")
        , Setting    = require("./models/setting")
        , News       = require("./models/news")
        , Contact    = require("./models/contact")
        , Service    = require("./models/service")
        , Case       = require("./models/casestudy")
        , seedDB     = require("./seed/seeds")
    // Routes
    const routes = {
            index:     require("./routes/index"),
            auth:      require("./routes/auth"),
            anythingElse: require("./routes/anythingElse"),
            api:       require("./routes/api"),
        };
    // Config
    const env = process.env.NODE_ENV || "development"
    const config = require('./config/config.js').get(env);

/*
* Module declarations.
* ------------------------------------------------
*/
    const app        = express()
/*
* Logging setup connection.
* ------------------------------------------------
*/
    logger.debug("Overriding 'Express' logger");
    app.use(morgan("tiny",{ "stream": logger.stream }));
/*
* Mongoose connection.
* ------------------------------------------------
*/
    // Setup connection.
    mongoose.connect(config.database, function(err, con) {
        if(err) {
            logger.error("ERROR connecting to DB")
        } else {
            logger.info("Connected to DB: " + con.name +  " on " + con.port);
        }
    });

    // Disconnect from DB if app closes.
    process.on('SIGINT', function() {
        mongoose.connection.close(function () {
            logger.info('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });

    app.use(session({
        secret: config.session.secret,
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    }));

    app.use(back());
/*
* Set defaults.
* ------------------------------------------------
*/
    app.use(bodyParser.urlencoded({extended: true}));
    app.set("view engine", "ejs");
    app.use(express.static(__dirname + "/public"));
    app.use(methodOverride("_method"));
/*

* Passport configuration.
* ------------------------------------------------
*/
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    // Pass User to every route
    app.use(function(req, res, next) {
        res.locals.currentUser = req.user;
        next();
    });

/*
* Seed DB.
* ------------------------------------------------
*/
    //seedDB.seedSettings(env); // Disable after first run as only need running once per environment
    //seedDB.seedUsers();
    //seedDB.seedServices();
    seedDB.seedCases();
    seedDB.seedNews();
/*
* Extra Middleware for under construction check
* ------------------------------------------------
*/
    let underConstruction = function(req, res, next) {
        Setting.findOne({}).exec((err, settings) => {
            if(err) {
                logger.error("error returning settings")
            } else {
                if(settings.underConstruction && req.url != "/newsletter") {
                    res.render("underConstruction")
                } else {
                    next();
                }
            }
        });
    };

    app.use(underConstruction);
/*
* ------------------------------------------------

* Load all routes.
* ------------------------------------------------
*/
    app.use("/", routes.index);
    app.use("/", routes.api);
    app.use("/auth", routes.auth);
    app.use("/", routes.anythingElse);

/*
* Setup Listening.
* ------------------------------------------------
*/
    app.listen(config.app.port, function() {
        logger.info("Techmeleon (" + env + ") server listening on port: " + config.app.port);
    });
