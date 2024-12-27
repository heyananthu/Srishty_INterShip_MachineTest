const mongoose = require('mongoose')
const resumeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    college: {
        type: [String],
        required: true
    },
    course: {
        type: [String],
        required: true
    },
    duration: {
        type: [String],
        required: true
    },
    company: {
        type: [String],
        required: true
    },
    position: {
        type: [String],
        required: true
    },
    comduration: {
        type: [String],
        required: true
    },
})

module.exports = mongoose.model("ResumeData", resumeSchema);


