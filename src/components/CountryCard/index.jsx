import "./styles.css";

import React from "react";

const CountryCard = ({ stats, code, name }) => {
  return (
    <div className="container">
      <img src={`https://www.countryflags.io/${code}/flat/48.png`} alt={name} />
      <h4 className="countryName">{name}</h4>
      <hr color="#606060" />
      {Object.keys(stats).map((stat) => {
        return (
          <div>
            <span className="statsHead">{stat}: </span>
            <span className="statsCount">{stats[stat]}</span>
          </div>
        );
      })}
    </div>
  );
};

export default CountryCard;
