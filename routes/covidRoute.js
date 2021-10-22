const express = require('express')
const covidController = require('../controllers/covidController')

const router = express.Router()

router.route('/').get(covidController.getCovidData).post(covidController.createCovidData)

module.exports = router