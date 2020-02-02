var mongoose = require("mongoose");

var ContactSchema = mongoose.Schema({
    name: String,
    email: String,
    telephone: String,
    Message: String,
    addedDate: Date
});


module.exports = mongoose.model("Contact", ContactSchema);