import React, { useEffect, useState } from 'react'
import Filter from './components/Filter';
import Person from './components/Person';
import PersonForm from './components/PersonForm';
import personServce from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ nameFilter, setNameFlter ] = useState('');
  const [ message, setMessage ] = useState('');
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
      <Notification message={message} />
      <Filter nameFilter={nameFilter} setNameFlter={setNameFlter}/>
      <h3>Add New Person</h3>
      <PersonForm 
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons}
        message={message}
        setMessage={setMessage}
      />
      <h3>Numbers</h3>
      {filteredPersons.map((person) => 
        <Person 
        key={person.id}
        person={person}
        persons={persons}
        setPersons={setPersons}
        message={message}
        setMessage={setMessage}
        />
      )}
    </div>
  )

}

export default App