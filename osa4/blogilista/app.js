const express = require('express')
const cors = require('cors')
require('express-async-errors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const config = require('./utils/config')
const middlewawre = require('./utils/middleware')

const app = express()

const mongoUrl = config.MONGODB_URL
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

app.use(middlewawre.unknownEndpoint)
app.use(middlewawre.errorHandler)

module.exports = app