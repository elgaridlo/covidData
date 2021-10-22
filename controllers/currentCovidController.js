const  asyncHandler = require('express-async-handler')

const CurrentCovid =  require('../models/currentCovidModel')
const NewCovid =  require('../models/covidModels')


// @desc Check Covid Record Now
// @route Get /api/CovidData
// @access Public
exports.getCovidData = asyncHandler(async(req, res) => {    
    const covidData = await CurrentCovid.findOne()
    console.log('covidData = ', covidData)
    res.status(201).json({
        data: covidData
    })
})

// @desc Create CovidData
// @route POST /api/CovidData
// @access Public
exports.createCurrentCovid = asyncHandler(async(req, res) => { 
    const covidData = await CurrentCovid.create(req.body)
    console.log('')
    res.status(201).json({
        status: 'success',
        data: covidData
    })
})

exports.updateCovidData = asyncHandler(async(req, res) => {
    let currentData = await CurrentCovid.findOne()
    const currentDate = new Date()
    const oneDayBefore = new Date(currentDate.getTime() - 86400000)
    let covidData
    if(!currentData) {
         currentData = await CurrentCovid.create({
            totalCases: 0,
            deathCases: 0,
            recoverCases: 0,
            newCases: 0,
            newDeathCases: 0,
            newRecoverCases: 0
        })
    } else {
        // console.log('currentData ', currentData)
        const newCovidData = await NewCovid.find({
            createdAt: {$lt: currentDate.getTime(), $gt: oneDayBefore < currentData.updatedAt ? currentData.updatedAt : oneDayBefore}
        })

        const newCalculate = await currentData.calculate(newCovidData)

        currentData = await CurrentCovid.findOneAndUpdate({
            totalCases: currentData.totalCases + newCalculate.newCases,
            deathCases: currentData.deathCases + newCalculate.newDeathCases,
            recoverCases: currentData.recoverCases + newCalculate.newRecoverCases,
            newCases: newCalculate.newCases ? newCalculate.newCases : currentData.newCases,
            newDeathCases: newCalculate.newDeathCases ? newCalculate.newDeathCases : currentData.newDeathCases,
            newRecoverCases: newCalculate.newRecoverCases ? newCalculate.newRecoverCases : currentData.newRecoverCases,
        })
        console.log('currentdata = ', currentData)
    }

    // const updateCovidData = await CurrentCovid.updateOne(req)
    res.status(201).json({
        status: 'success',
        data : currentData
    })
})