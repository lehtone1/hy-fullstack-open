import React from 'react';
import personService from '../services/persons'

const Person = ({person, persons, setPersons, message, setMessage}) => {
  const {name, number} = person;
  const deletePerson = (person) => {
      const {name, id} = person;
      const newMessage = `${name} deleted`
      personService.remove(id)
        .then(() => {
          const newPersons = persons.filter((person) => person.id !== id)
          console.log(newPersons)
          setPersons(newPersons)
        })
      setMessage(newMessage)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
  }
  return (
    <p>{name} {number} <button onClick={() => deletePerson(person)}>Delete</button></p>
  ) 
}

export default Person;
