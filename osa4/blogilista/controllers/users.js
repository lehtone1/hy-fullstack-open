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

  if(body.password.length < 3) {
    response.status(400).send({error: `User validation failed: password: Path 'password' ('${body.password}') is shorter than the minimum allowed length (3).`})
  }  
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