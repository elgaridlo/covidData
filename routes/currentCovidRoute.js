const express = require('express')
const currentCovidController = require('../controllers/currentCovidController')

const router = express.Router()

router.route('/').get(currentCovidController.getCovidData).post(currentCovidController.updateCovidData)

module.exports = router