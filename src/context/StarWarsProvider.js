import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [filterOrd, setFilterOrd] = useState({ order: { column: '', sort: '' } });
  const [results, setResults] = useState([]);
  const [buttonFilter, setButtonFilter] = useState([]);
  const [renderPlanets, setRenderPlanets] = useState([]);
  const [inputFilterName, setInputFilterName] = useState(results);
  const [renderFilters, setRenderFilters] = useState();

  useEffect(() => {
    const url = 'https://swapi.dev/api/planets';
    const requestAPI = async () => {
      const response = await fetch(url);
      const json = await response.json();
      const filterResults = json.results;
      const removeResidents = filterResults.filter((resp) => delete resp.residents);
      setResults(removeResidents);
    };
    requestAPI();
  }, []);
  const contextValue = {
    results,
    filterOrd,
    setFilterOrd,
    buttonFilter,
    setButtonFilter,
    renderPlanets,
    setRenderPlanets,
    inputFilterName,
    setInputFilterName,
    renderFilters,
    setRenderFilters,
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
