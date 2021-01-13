const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', (request, response) => {
  User.find({}).then(users => {
    response.status(200).json(users)
  })
})

userRouter.post('/', async (request, response) => {
  const body = request.body
  const passwordHash = await bcrypt.hash(body.password, 10)

  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })
  
  const savedUser = await newUser.save()

  response.status(200).json(savedUser)
})

module.exports = userRouter