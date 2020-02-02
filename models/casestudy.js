
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var caseStudySchema = mongoose.Schema({
    caseName: String,
    mainImage: String,
    shortDescription: String,
    sector: {
        type: String,
        enum: ["Commercial", "Residential"]
    },
    service: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
    keyFacts: [String],
    caseContent: [
        {
            name: String,
            order: Number,
            type: {
                type: String,
                enum: ["text", "image", "video"]
            },
            content: String
        }
    ],
    createDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("CaseStudy", caseStudySchema);