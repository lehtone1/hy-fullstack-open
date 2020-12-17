import React from 'react';
import personService from '../services/persons'

const PersonForm = ({newName, setNewName, newNumber, setNewNumber, persons, setPersons}) => {
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
  }

  const addPerson = (event) => {
    event.preventDefault()
    if(names.includes(newName)) {
      const message = `${newName} is already added to the phonebook, replace the old number with a new one?`;
      const confirm = window.confirm(message)
      if(confirm) {
        updateNumber()
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      personService.create(newPerson)
        .then((createdPerson) => 
          setPersons(persons.concat(createdPerson))
        )
      setNewName('');
      setNewNumber('');
    }
  }

  return (
    <form onSubmit={addPerson}>
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
