const mongoose = require('mongoose')

const currentCovidDataSchema = mongoose.Schema({
    totalCases: {
        type: Number,
        required: true
    },
    deathCases: {
        type: Number,
        required: true,
    },
    recoverCases: {
        type: Number,
        required: true,
    },
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
    timestamps: true,
})

currentCovidDataSchema.methods.calculate = function (newCovidData) {
    const newRecord = {
        newCases: 0,
        newDeathCases: 0,
        newRecoverCases: 0,
    }

    newCovidData.map((x) => {
        newRecord.newCases += Number(x.newCases) || 0
        newRecord.newDeathCases += Number(x.newDeathCases) || 0
        newRecord.newRecoverCases += Number(x.newRecoverCases) || 0
    })

    return newRecord
}

const CurrentCovidData = mongoose.model('CurrentCovid', currentCovidDataSchema)

module.exports = CurrentCovidData