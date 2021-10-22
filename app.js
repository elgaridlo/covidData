const express = require('express')
const dotenv = require('dotenv')
const cron = require('node-schedule')

const errorMiddleware = require('./middlewares/errorMiddleware')
const connectDB = require('./config/db')
const covidRoute = require('./routes/covidRoute')
const currentCovidRoute = require('./routes/currentCovidRoute')
const currentCovidController = require('./controllers/currentCovidController')
const { default: axios } = require('axios')


dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.use('/api/covid', covidRoute)

app.use('/api/covidNow', currentCovidRoute)
cron.scheduleJob('45 11 * * *', () => {
    axios.post('http://localhost:5000/api/covidNow').then((res) => {
        console.log('response = ', res.data)
    })
    console.log('masuk', new Date())
})
app.use(errorMiddleware.notFound)
app.use(errorMiddleware.errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))