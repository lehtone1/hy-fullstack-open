import React from 'react';
import personService from '../services/persons'

const PersonForm = ({newName, setNewName, newNumber, setNewNumber, persons, setPersons, message, setMessage, errorMessage, setErrorMessage}) => {
  const names = persons.map((person) => person.name);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const updateNumber = () => {
    const person = persons.find(p => p.name === newName);
    const updatedPerson = {...person, number:newNumber};
    personService.update(updatedPerson.id, updatedPerson)
      .then((returnedPerson) => {
        setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person ))
      })
      .catch((error) => {
        const newMessage = `${person.name} was already removed from server`;
        setErrorMessage(newMessage);
      })
  }

  const clearInputs = () => {
    setNewName('');
    setNewNumber('');
  }

  const showNotification = (newMessage) => {
    setMessage(newMessage)
    setTimeout(() => {
      setMessage(null)
    },5000)
  }

  const addPersonToSrver = () => {
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    personService.create(newPerson)
      .then((createdPerson) => 
        setPersons(persons.concat(createdPerson))
      )
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    if(names.includes(newName)) {
      const newMessage = `${newName} already exists in the phonebook, number updated into new one`;
      updateNumber()
      clearInputs()
      showNotification(newMessage)
    } else {
      const newMessage = `${newName} added`
      addPersonToSrver();
      clearInputs();
      showNotification(newMessage);
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm;
