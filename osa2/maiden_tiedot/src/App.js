import React, {useEffect, useState} from 'react';
import axios from 'axios';

const CountryInfo = ({country}) => {
  return (
    <>
      <h1>{country.name}</h1>
      <p>capital {country.captal}</p>
      <p>population {country.population}</p>
      <h2>Languages</h2>
      <ul>          
        {country.languages.map((language) => 
          <li>{language.name}</li>
        )}  
      </ul>
      <img style={{height:"150px"}} src={country.flag} alt=""/>
    </>
    
  )
}

const CountryList = ({countries}) => {
  return (
    <>
      {countries.map((country) => 
        <p key={country.alpha2Code}>{country.name}</p>
      )}
    </>
  )
}

const CountryFilter = ({filter, setFilter}) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  return (
    <p>Find counries<input value={filter} onChange={handleFilterChange}/></p>
  )
}

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const filteredCountries = countries.filter((country) => country.name.includes(filter))

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => {
        setCountries(response.data);
      })
  }, [])

  if(filteredCountries.length > 10) {
    return (
      <div>
        <CountryFilter filter={filter} setFilter={setFilter}/>
        <p>Too many matches, specfy another filter</p>
      </div>
    )
  }

  if(filteredCountries.length > 1) {
    return (
      <div>
        <CountryFilter filter={filter} setFilter={setFilter}/>
        <CountryList countries={filteredCountries}/>
      </div>
    )
  }
  if(filteredCountries.length == 1) {
    return (
      <div>
        <CountryFilter filter={filter} setFilter={setFilter}/>
        <CountryInfo country={filteredCountries[0]}/>
      </div>
    );
  }

  return (
    <div></div>
  )
}

export default App;
