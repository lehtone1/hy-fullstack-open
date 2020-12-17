import React from 'react';
import personService from '../services/persons'

const Person = ({person, persons, setPersons}) => {
  const {name, number} = person;
  const deletePerson = (person) => {
      const {name, id} = person;
      const message = `delete ${name}?`
      const confirm = window.confirm(message)
      if(confirm) {
        personService.remove(id)
          .then(() => {
            const newPersons = persons.filter((person) => person.id !== id)
            console.log(newPersons)
            setPersons(newPersons)
          })
      }
  }
  return (
    <p>{name} {number} <button onClick={() => deletePerson(person)}>Delete</button></p>
  ) 
}

export default Person;
