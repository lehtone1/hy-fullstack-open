const mognoose = require('mongoose')

const userScema = mognoose.Schema({
  username: {
    type: String,
    minlength: 3
  },
  name: String,
  passwordHash: String,
  blogs: {
    type: mognoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }
})

userScema.set('toJSON', {
  transform : (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject._v
  }
})

module.exports = mognoose.model('User', userScema)