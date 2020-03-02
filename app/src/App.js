import React, {useState, useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import SuccessNotification from './components/SuccessNotification'
import ErrorNotification from './components/ErrorNotification'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
      setErrorMessage(`${newName} is already added to phonebook`)
    } else if (isAlreadyAddedNumber) {
      setErrorMessage(`${newNumber} is already used number in phonebook`)
    } else if (isAlreadyAddedName) {
      // update処理
      if (window.confirm(`${modifyPerson.name} is already added to phonebook, replace old number with a new one?`)) {
        personService
          .update(modifyPerson.id, modifyPerson)
          .then(modifiedPerson => {
            setPersons(
              persons.map(person => person.id === modifiedPerson.id ? modifiedPerson : person)
            )
            setSuccessMessage('update completed');
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000)
          })
          .catch(() => {
            setErrorMessage(`Information of ${modifyPerson.name} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000)
          })
      }
    } else {
      // create処理
      const newPersonObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(newPersonObject)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))

      setSuccessMessage('create completed');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000)
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
        <SuccessNotification message={successMessage} />
        <ErrorNotification message={errorMessage} />
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