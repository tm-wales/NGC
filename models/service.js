
var mongoose = require("mongoose");

var ServiceSchema = mongoose.Schema({
    serviceName: String,
    landingImage: String,
    landingText: String,
    contentList: [
        {
            name: String,
            content: String,
            type: {
                type: String,
                enum: ["image","video","text"]
            },
            order: Number
        }
    ],
    order: Number
});

module.exports = mongoose.model("Service", ServiceSchema);