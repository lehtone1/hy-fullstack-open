require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const Person = require('./modules/person')

morgan.token('body', function getBody (req) {
  return JSON.stringify(req.body)
})

const app = express();

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body :method'));
app.use(cors())
app.use(express.static('build'))

let persons = [
  { 
    "name": "Arto Hellas", 
    "number": "040-123456",
    "id": 1
  },
  { 
    "name": "Ada Lovelace", 
    "number": "39-44-5323523",
    "id": 2
  },
  { 
    "name": "Dan Abramov", 
    "number": "12-43-234345",
    "id": 3
  },
  { 
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122",
    "id": 4
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello world!</h1>')
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then((people) => {
    res.json(people)
  })
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  console.log("-----ID-----")
  console.log(id)
  Person.findById(id)
  .then(person => {
    console.log("----PERSON----")
    console.log(person)
    if(person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  })
})

app.get('/info', (req, res) => {
  const now = new Date(Date.now())
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p>
    <p>${now}</p>`
  )
})

const createId = () => {
  return Math.floor(Math.random() * 1000000)
}

app.post('/api/persons', (req, res) => {
  const body = req.body

  if(!body.name || !body.number) {
    return res.status(400).json({
      error: "Content missing"
    })
  } 

  const person = new Person({
    name: body.name,
    number: body.number
  })
  
  person.save().then(savedNote => {
    res.json(savedNote)  
  })
  

})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter((person) => person.id !== id)

  res.status(204).end()
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
