require("dotenv").config();

const mongoose = require("mongoose");
const url = process.env.MONGODB_URL;

console.log("Connecting to", url)
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
.then(response => {
  console.log("Connected to MangoDB")
})
.catch(error => {
  console.log("Error connecting to MangoDB: ", error)
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
