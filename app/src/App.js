import React, {useState, useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService.getAll()
      .then(initialData => setPersons(initialData))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()

    // 番号が重複しているかのチェック
    const isAlreadyAddedNumber = persons.some(person => person.number === newNumber)

    // 名前が重複していたら、update用にmodifyPersonに値をコピーする
    let modifyPerson = {}
    const isAlreadyAddedName = persons.some(person => {
      if (person.name === newName) {
        modifyPerson = Object.assign({}, person)
        modifyPerson.number = newNumber
        return true
      }
    })

    // 重複バリデーション
    if (isAlreadyAddedName && isAlreadyAddedNumber) {
      alert(`${newName} is already added to phonebook`)
    } else if (isAlreadyAddedNumber) {
      alert(`${newNumber} is already used number in phonebook`)
    } else if (isAlreadyAddedName) {
      console.log(modifyPerson)
      // update処理
      if(window.confirm(`${modifyPerson.name} is already added to phonebook, replace old number with a new one?`)) {
        personService
          .update(modifyPerson.id, modifyPerson)
          .then(modifiedPerson => {
            console.log(modifiedPerson)
            setPersons(
              persons.map(person => person.id === modifiedPerson.id ? modifiedPerson : person)
            )
          })
      }
    } else {
      console.log('create')

      // create処理
      const newPersonObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(newPersonObject)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
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

  const handleDeletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.deletePerson(id)
        .then(res => setPersons(res))
    }
  }

  const showPersons = () => {
    let personsToShow = persons
    if (newFilter !== '') {
      personsToShow = persons.filter((person) => {
        return person.name.includes(newFilter)
      })
    }

    return personsToShow.map((person) => {
      return (
        <Persons key={person.id} person={person} handleDeletePerson={handleDeletePerson}/>
      )
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