var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'mail.nurturedlandscapes.co.uk',
    port: 25,
    secure: false,
    auth: {
        user: "webcontact@nurturedlandscapes.co.uk",
        pass: "surfsup1"
    },
    tls: {
        rejectUnauthorized: false
    }
});

transporter.verify(function(error, success) {
    if(error) {
        console.log("email verification failed")
    } else {
        console.log("email verification SUCCESS")
    }
});
module.exports = transporter;