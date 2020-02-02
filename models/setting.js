var mongoose = require("mongoose");

var SettingSchema = mongoose.Schema({
    env: {
        type: String,
        enum: ["development", "test", "production"]
    },
    underConstruction: Boolean
});


module.exports = mongoose.model("Setting", SettingSchema);