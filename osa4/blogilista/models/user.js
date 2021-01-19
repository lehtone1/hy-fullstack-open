const mognoose = require('mongoose')

const userScema = mognoose.Schema({
  username: {
    type: String,
    minlength: 3
  },
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