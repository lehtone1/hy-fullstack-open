require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./modules/person')

morgan.token('body', function getBody (req) {
  return JSON.stringify(req.body)
})

const app = express()

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body :method'))
app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((people) => {
      res.json(people)
    })
    .catch((error) => {
      next(error)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
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

app.get('/info', (req, res, next) => {
  const now = new Date(Date.now())
  Person.find({})
    .then((people) => {
      res.send(
        `<p>Phonebook has info for ${people.length} people</p>
        <p>${now}</p>`
      )
    })
    .catch((error) => {
      next(error)
    })
})

app.post('/api/persons', (req, res, next) => {
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

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  const name = { name: body.name}
  const number = { number: body.number}


  Person.findOneAndUpdate(name, number, { new: true})
    .then(updatedNote => {
      res.json(updatedNote)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndRemove(id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => {
      next(error)
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.log(error.message)
  if(error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id'})
  } else if(error.name === 'ValidationError') {
    return res.status(400).send({error: error.message})
  }

  next(error)
}

app.use(errorHandler)