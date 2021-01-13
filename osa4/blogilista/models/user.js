const mognoose = require('mongoose')

const userScema = mognoose.Schema({
  username: String,
  name: String,
  passwordHash: String 
})

userScema.set('toJSON', {
  transform : (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject._v
  }
})

module.exports = mognoose.model('User', userScema)