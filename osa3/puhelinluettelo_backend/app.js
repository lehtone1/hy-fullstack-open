const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const peopleRouter = require('./controllers/people')
const config = require('./utils/config')
const logger = require('./utils/logger')

const app = express()

logger.info('Connecting to', config.MONGODB_URL)
mongoose.connect(config.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
  .then(() => {
    logger.info('Connected to MangoDB')
  })
  .catch(error => {
    logger.error('Error connecting to MangoDB: ', error)
  })

morgan.token('body', function getBody (req) {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body :method'))
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use('/api/persons', peopleRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app