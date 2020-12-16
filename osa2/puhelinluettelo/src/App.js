import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [ newName, setNewName ] = useState('');
  const names = persons.map((person) => person.name)

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const addName = (event) => {
    event.preventDefault()
    if(names.includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        name: newName
      };
      setPersons(persons.concat(newPerson));
      setNewName(''); 
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>debug: {newName}</div>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => 
        <p>{person.name}</p>
      )}
    </div>
  )

}

export default App