import axios from "axios";
import { useEffect, useState } from "react";
import Countries from "./components/Countries";

function App() {
  const [allcounteries, setAll] = useState(null);
  const [countries, setCountries] = useState([]);
  const [showDetails,setShow] = useState(false);
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setAll(response.data)
      });
  },[]);
  const findHandler = (event) => {
    const countryName = event.target.value;
    const filter = allcounteries.filter((c) => c.name
    .common
    .toLowerCase()
    .includes(countryName.toLowerCase()))
    console.log(filter.length,countryName)
    setCountries(filter);
    showDetails && setShow(false);
  };
  if (allcounteries === null) return <h1>Loading...</h1>;
  return (
    <>
      <div>
        find countries <input type="text" onChange={findHandler} />
      </div>
      {countries && (countries.length >= 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : (
        <Countries countries={countries} showDetails={showDetails} setShow={setShow} />
      ))}
    </>
  );
}

export default App;
