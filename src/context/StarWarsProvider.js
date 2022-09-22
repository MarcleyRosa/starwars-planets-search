import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [results, setResults] = useState([]);
  useEffect(() => {
    const url = 'https://swapi.dev/api/planets';
    const requestAPI = async () => {
      const response = await fetch(url);
      const json = await response.json();
      const filterResults = json.results;
      const removeResidents = filterResults.filter((resp) => delete resp.residents);
      console.log(removeResidents);
      setResults(removeResidents);
    };
    requestAPI();
  }, []);
  const contextValue = {
    results,
  };
  return (
    <StarWarsContext.Provider value={ contextValue }>
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;
