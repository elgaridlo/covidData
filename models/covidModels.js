const mongoose = require('mongoose')

const covidDataSchema = mongoose.Schema({
    newCases: {
        type: Number,
        required: true,
    },
    newDeathCases: {
        type: Number,
        required: true,
    },
    newRecoverCases: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
})

const CovidData = mongoose.model('CovidData', covidDataSchema)

module.exports = CovidData