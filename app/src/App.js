import React, {useState} from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas', number: '040-123456'},
    {name: 'Ada Lovelace', number: '39-44-5323523'},
    {name: 'Dan Abramov', number: '12-43-234345'},
    {name: 'Mary Poppendieck', number: '39-23-6423122'}
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
    console.log('filter')
    setNewFilter(event.target.value)
  }
  const handleNameChange = (event) => {
    console.log('name')
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log('num')
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

const Filter = ({newFilter, handleFilterChange}) => {
  return(
    <div>
      <p>filter shown with</p>
      <input value={newFilter} onChange={handleFilterChange}/>
    </div>
  )
}

const PersonForm = ({newName,newNumber,handleNameChange,handleNumberChange}) => {
  return(
    <div>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
    </div>
  )
}

const Persons = ({person}) => {
  return <p>{person.name} {person.number}</p>
}