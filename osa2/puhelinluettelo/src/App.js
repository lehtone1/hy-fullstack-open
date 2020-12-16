import React, { useState } from 'react'

const Person = ({person}) => {
  const {name, number} = person
  return (
    <p>{name} {number}</p>
  ) 
}

const Filter = ({nameFilter, setNameFlter}) => {
  const handleFilterChange = (event) => {
    setNameFlter(event.target.value);
  }

  return (
    <input value={nameFilter} onChange={handleFilterChange}/>
  )
  
}

const PersonForm = ({newName, setNewName, newNumber, setNewNumber, persons, setPersons}) => {
  const names = persons.map((person) => person.name);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault()
    if(names.includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      };
      setPersons(persons.concat(newPerson));
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

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ nameFilter, setNameFlter ] = useState('');
  const filteredPersons = persons.filter((person) => person.name.includes(nameFilter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} setNameFlter={setNameFlter}/>
      <h3>Add New Person</h3>
      <PersonForm 
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons}
      />
      <h3>Numbers</h3>
      {filteredPersons.map((person) => 
        <Person person={person}/>
      )}
    </div>
  )

}

export default App