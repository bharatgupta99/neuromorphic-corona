import "./styles.css";

import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const baseUrl = "https://api.covid19api.com/";

const SearchBar = ({ handleCountriesChange }) => {
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [error, setError] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      setLoading(true);
      const response = await fetch(baseUrl + "countries");
      const countries = await response.json();
      setCountries(countries);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCountryChange = (countries) => {
    const formattedCountries = countries.map((country) => ({
      name: country.label,
      slug: country.slug,
      code: country.value,
    }));
    handleCountriesChange(formattedCountries);
  };

  const getOptions = () => {
    const options = countries.map((country) => ({
      value: country.ISO2,
      label: country.Country,
      slug: country.Slug,
    }));
    return options;
  };

  return (
    <div className="searchContainer">
      <FontAwesomeIcon icon={faArrowRight} size="lg" color="#787878" />
      <Select
        options={getOptions()}
        placeholder="Select countries..."
        isMulti={true}
        isDisabled={loading}
        maxMenuHeight={200}
        onChange={handleCountryChange}
        styles={{
          container: (provided) => ({
            ...provided,
            width: "94%",
            marginLeft: "10px",
          }),
          control: (provided, state) => ({
            ...provided,
            border: 0,
            backgroundColor: "var(--neu-color, #dde1e7)",
            outline: "none",
            boxShadow: "none",
          }),
          multiValue: (provided) => ({
            ...provided,
            backgroundColor: "var(--neu-color, #dde1e7)",
          }),
          multiValueLabel: (provided) => ({
            ...provided,
            color: "#000",
          }),
          menu: (provided) => ({
            ...provided,
            backgroundColor: "var(--neu-color, #dde1e7)",
            border: "none",
          }),
        }}
      />
    </div>
  );
};

export default SearchBar;
