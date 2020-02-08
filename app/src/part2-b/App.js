import React, {useState, useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  },[])

  const handleSubmit = (event) => {
    event.preventDefault()

    const isDouble = persons.some(person => person.name === newName)

    if (isDouble) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPersonObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newPersonObject))
    }
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const showPersons = () => {
    let personsToShow = persons

    if (newFilter !== '') {
      personsToShow = persons.filter((person) => {
        return person.name.includes(newFilter)
      })
    }

    return personsToShow.map((person) => {
      return <Persons key={person.number} person={person}/>
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Phonebook</h2>
        <div>
          <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
        </div>
        <h2>add a new</h2>
        <PersonForm
          newName={newName}
          newNumber={newNumber}
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
        />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {showPersons()}
    </div>
  )
}

export default App