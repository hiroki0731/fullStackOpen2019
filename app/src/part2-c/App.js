import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Country = ({country}) => {
  const showLanguages = (languages) => {
    return (
      languages.map(language => <li key={language.iso639_1}>{language.name}</li>)
    )
  }

  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h2>languages</h2>
      <ul>
        {showLanguages(country.languages)}
      </ul>
      <img src={country.flag} />
    </div>
  )
}

const Countries = ({country, setFilter}) => {
  const handleShow = () => {
    setFilter(country.name);
  }

  return (
    <div>
      <p>{country.name}</p>
      <button onClick={handleShow}>show</button>
    </div>
  )
}


const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => {
        setCountries(response.data)
      })
  }, [])

  const filterCountries = (event) => {
    setFilter(event.target.value)
  }

  const showCountries = () => {
    const newCountries = countries.filter((country) => {
      return country.name.includes(filter)
    })

    if (newCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>
    } else if (newCountries.length === 1) {
      console.log('filtered country:', newCountries[0])

      return <Country country={newCountries[0]}/>
    } else {
      return newCountries.map((country) => {
        return <Countries key={country.name} country={country} setFilter={setFilter}/>
      })
    }
  }

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={filterCountries}/>
      </div>
      <div>
        {showCountries()}
      </div>
    </div>
  )
}

export default App