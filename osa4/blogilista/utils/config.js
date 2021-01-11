require('dotenv').config()

const NODE_ENV = process.env.NODE_ENV
const MONGODB_URL = NODE_ENV === 'test'? process.env.TEST_MONGODB_URL:process.env.MONGODB_URL
const PORT = process.env.PORT

module.exports = {
  MONGODB_URL, PORT
}