const peopleRouter = require('express').Router()
const Person = require('../modules/person')

peopleRouter.get('/', (req, res, next) => {
  Person.find({})
    .then((people) => {
      res.json(people)
    })
    .catch((error) => {
      next(error)
    })
})

peopleRouter.get('/:id', (req, res, next) => {
  const id = req.params.id
  Person.findById(id)
    .then(person => {
      if(person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => {
      next(error)
    })
})

peopleRouter.post('/', (req, res, next) => {
  const body = req.body

  if(!body.name || !body.number) {
    return res.status(400).json({
      error: 'Content missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedNote => {
    res.json(savedNote)  
  })
    .catch((error) => {
      next(error)
    })
})

peopleRouter.put('/:id', (req, res, next) => {
  const body = req.body
  const name = { name: body.name}
  const number = { number: body.number}


  Person.findOneAndUpdate(name, number, { new: true})
    .then(updatedNote => {
      res.json(updatedNote)
    })
    .catch(error => next(error))
})

peopleRouter.delete('/:id', (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndRemove(id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => {
      next(error)
    })
})

module.exports = peopleRouter
