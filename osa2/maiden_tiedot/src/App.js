import React, {useEffect, useState} from 'react';
import axios from 'axios';

const CountryInfo = ({country}) => {
  return (
    <>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>Languages</h2>
      <ul>          
        {country.languages.map((language) => 
          <li key={language.iso639_1}>{language.name}</li>
        )}  
      </ul>
      <img style={{height:"150px"}} src={country.flag} alt=""/>
      <WeatherInfo name={country.capital}/>
    </>
    
  )
}

const CountryShort = ({country, setFilter}) => {
  return (
    <p>{country.name} <button onClick={() => setFilter(country.name)}>show</button></p>
  )
}

const CountryList = ({countries, setFilter}) => {

  return (
    <>
      {countries.map((country) => 
        <CountryShort key={country.alpha2Code} country={country} setFilter={setFilter}/>
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

const WeatherInfo = ({name}) => {
  const [weather, setWeather] = useState({})
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${name}`)
      .then((response) => {
        setWeather(response.data.current)
      })
  }, [])

  console.log(weather)

  return (
    <>
      <h2>Weather in Helsinki</h2>
      <p>temperature: {weather.temperature} Celcus</p>
      <img style={{height:"100px"}} src={weather.weather_icons} alt=""/>
      <p>wind: {weather.wind_speed} mph direction {weather.wind_dir}</p>
    </>
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
        <CountryList countries={filteredCountries} setFilter={setFilter}/>
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
    <div>
      <CountryFilter filter={filter} setFilter={setFilter}/>
    </div>
  )
}

export default App;
