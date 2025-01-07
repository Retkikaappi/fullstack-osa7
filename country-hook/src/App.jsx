import React, { useState, useEffect, use } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
    .then(resp => {
      const found = resp.data
      setCountry({
        data: {
          name: found.name.common,
          capital: found.capital[0],
          population: found.population,
          flag: found.flags.png
        },
        found:true
      })
    })
    .catch(error => {
      setCountry({
        data: {
          error: error.message
        },
        found: false
      })
    })
  }, [name])
  
  return country
}

const Country = ({ country }) => {

  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App