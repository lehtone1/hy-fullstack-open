import React, { useEffect, useState } from 'react'
import Filter from './components/Filter';
import Person from './components/Person';
import PersonForm from './components/PersonForm';
import personServce from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ nameFilter, setNameFlter ] = useState('');
  const filteredPersons = persons.filter((person) => person.name.includes(nameFilter))

  useEffect(() => {
    personServce.getAll()
      .then((persons) => {
        setPersons(persons)
      })
  }, [])

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
        <Person key={person.id} person={person}/>
      )}
    </div>
  )

}

export default App