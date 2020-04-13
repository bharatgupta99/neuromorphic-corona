import "./styles.css";

import React, { useState } from "react";

import CountryCard from "../components/CountryCard";
import SearchBar from "../components/SearchBar";

const Home = () => {
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleCountriesChange = (countries) => {
    fetchCountriesData(countries);
  };

  const fetchCountriesData = async (countries) => {
    setLoading(true);
    const baseUrl = "https://api.covid19api.com/live/country/";
    const apis = countries.map((country) =>
      fetch(`${baseUrl}${country.slug}`).then((response) => {
        return response.json();
      })
    );
    const responses = await Promise.all(apis);
    setData(responses);
    setLoading(false);
  };

  return (
    <div>
      <SearchBar handleCountriesChange={handleCountriesChange} />
      <div className="cardsContainer">
        {data.map((item, index) => {
          if (item[0]) {
            return (
              <CountryCard
                key={index}
                name={item[0].Country}
                code={item[0].CountryCode.toLowerCase()}
                stats={{
                  Confirmed: item[0].Confirmed,
                  Deaths: item[0].Deaths,
                  Recovered: item[0].Recovered,
                  Active: item[0].Active,
                }}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Home;
