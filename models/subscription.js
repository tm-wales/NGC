var mongoose = require("mongoose");

var SubscriptionSchema = mongoose.Schema({
    email: { type: String, unique: true, required: true },
    addDate: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model("Subscription", SubscriptionSchema);