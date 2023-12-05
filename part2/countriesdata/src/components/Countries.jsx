import Country from "./Country";
import { useState } from "react";

function Countries({ countries, showDetails, setShow }) {
  const [country, setCountry] = useState(null);
  const clickHandler = (cntry) => () => {
    setCountry(cntry);
    setShow(true);
  };
  if (countries.length === 1) {
    return <Country country={countries[0]} />;
  }
  return !showDetails ? (
    countries.map((cntry) => (
      <div key={cntry.name.common}>
        {cntry.name.common} <button onClick={clickHandler(cntry)}>show</button>
      </div>
    ))
  ) : (
    <Country country={country} />
  );
}

export default Countries;
