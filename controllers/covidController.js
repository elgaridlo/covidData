const  asyncHandler = require('express-async-handler')
const CovidData =  require('../models/covidModels')

// @desc Create CovidData
// @route POST /api/CovidData
// @access Public
exports.createCovidData = asyncHandler(async(req, res) => { 
    const covidData = await CovidData.create(req.body)
    res.status(201).json({
        status: 'success',
        data: covidData
    })
})

// @desc Get All CovidData
// @route Get /api/CovidData
// @access Public
exports.getCovidData = asyncHandler(async(req, res) => {    
    const covidData = await CovidData.find()
    res.status(201).json({
        data: 'covidData'
    })
})