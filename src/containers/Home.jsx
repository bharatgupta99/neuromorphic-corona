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
    combineData(responses);
    setLoading(false);
  };

  const combineData = (responses) => {
    const dataSet = [];
    responses.forEach((states) => {
      const stateData = {
        Country: states[0].Country,
        CountryCode: states[0].CountryCode,
        Confirmed: 0,
        Deaths: 0,
        Recovered: 0,
        Active: 0,
      };
      states.forEach((state) => {
        stateData.Confirmed += state.Confirmed;
        stateData.Deaths += state.Deaths;
        stateData.Recovered += state.Recovered;
        stateData.Active += state.Active;
      });
      dataSet.push(stateData);
    });
    console.log("ds=>", dataSet);
    setData(dataSet);
  };

  return (
    <div>
      <SearchBar handleCountriesChange={handleCountriesChange} />
      <div className="cardsContainer">
        {data.map((item, index) => {
          if (item) {
            return (
              <CountryCard
                key={index}
                name={item.Country}
                code={item.CountryCode.toLowerCase()}
                stats={{
                  Confirmed: item.Confirmed,
                  Deaths: item.Deaths,
                  Recovered: item.Recovered,
                  Active: item.Active,
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
