require('dotenv').config()

let PORT = process.env.PORT
let ENV = process.env.NODE_ENV
let MONGODB_URL = ENV === 'test'? process.env.TEST_MONGODB_URL: process.env.MONGODB_URL

module.exports = {
  PORT, MONGODB_URL
}