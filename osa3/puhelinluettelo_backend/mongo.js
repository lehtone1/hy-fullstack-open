const mongoose = require("mongoose")

if(process.argv.length < 3) {
  console.log("Password required")
  process.exit()
}
const password = process.argv[2]
const url = `mongodb+srv://lehtone1:${password}@cluster0.hpjfk.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String, 
  number: String
})

const Person = mongoose.model("Person", personSchema)


if(process.argv.length == 3) {
  Person.find({}).then((persons) => {
    persons.forEach((person) => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}


const name = process.argv[3]
const number = process.argv[4]

const person = new Person({
  name: name,
  number: number
})

person.save().then((response) => {
  console.log(`added ${name} number ${number} to phonebook`)
  mongoose.connection.close()
})
