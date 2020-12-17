import React, { useState } from 'react';
import personService from '../services/persons'

const Person = ({person, persons, setPersons, message, setMessage, errorMessage, setErrorMessage}) => {
  const {name, number} = person;
  const deletePerson = (person) => {
      const {name, id} = person;
      personService.remove(id)
        .then(() => {
          const newPersons = persons.filter((person) => person.id !== id)
          const newMessage = `${name} deleted`
          setPersons(newPersons)
          setMessage(newMessage)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch((error) => {
          const newMessage = `${name} was already removed from server`;
          setErrorMessage(newMessage);
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
  }
  return (
    <p>{name} {number} <button onClick={() => deletePerson(person)}>Delete</button></p>
  ) 
}

export default Person;
