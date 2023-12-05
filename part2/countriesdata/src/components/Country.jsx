import axios from "axios";
import { useEffect, useState } from "react";

function Country({ country }) {
  const api_key = import.meta.env.VITE_SOME_KEY;
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${api_key}&units=metric`
      )
      .then((response) => {
        setWeather(response.data);
      })
      .then(() => console.log(weather));
  }, []);

  return (
    weather && (
      <>
        <h1>{country.name.common}</h1>
        <div>
          capital <b>{country.capital[0]}</b>
        </div>
        <div>
          area <b>{country.area}</b>
        </div>
        <h3>Languages</h3>
        <ul>
          {Object.values(country.languages).map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={country.name.common}/>
        <h1>Weather in {country.capital[0]}</h1>
        <div>temperature <b>{weather.main.temp}</b> Celcius</div>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
        <div>wind {weather.wind.speed} m/s</div>
      </>
    )
  );
}

export default Country;
