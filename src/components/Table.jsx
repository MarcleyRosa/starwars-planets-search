import React, { useContext, useState, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import StarWarsSort from './FilterSort';

function StarWarsTable() {
  const columnAll = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  const tableHeader = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate',
    'Gravity', 'Terrain', 'Surface Water', 'Population', 'Films',
    'Created', 'Edited', 'Url'];

  const { results, filterOrd, buttonFilter, setButtonFilter, renderPlanets,
    setRenderPlanets, inputFilterName, setInputFilterName, renderFilters,
    setRenderFilters } = useContext(StarWarsContext);
  const [filterName, setFilterName] = useState('');
  const [filterColumn, setFilterComumn] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [filterValue, setFilterValue] = useState(0);

  const [filterOptions, setFilterOptions] = useState(columnAll);

  const handleClick = () => {
    const optionFilter = filterOptions.filter((opt) => opt !== filterColumn);
    setFilterOptions(optionFilter);

    setButtonFilter((prevState) => ([...prevState, {
      column: filterColumn,
      comparison: comparisonFilter,
      value: filterValue,
    }]));
    setFilterComumn('population');
    setComparisonFilter('maior que');
    setFilterValue(0);
  };

  const removeFilter = ({ target: { id } }) => {
    console.log(id);
    const filterRemova = buttonFilter.filter((filter) => filter.column !== id);
    setButtonFilter(filterRemova);
    setFilterOptions((prevState) => ([...prevState, id]));
    setRenderFilters(results);
  };

  const removeAllFilters = () => {
    setButtonFilter([]);
    setFilterOptions(columnAll);
  };

  useEffect(() => {
    setRenderFilters(results);
  }, [results]);

  useEffect(() => {
    const namesFilter = results
      .filter((e) => e.name.toUpperCase().includes(filterName.toUpperCase()));
    setInputFilterName(namesFilter);
  }, [filterName, results]);

  useEffect(() => {
    buttonFilter.forEach((filt) => {
      let planFilter = [];

      console.log(filt.comparison);
      console.log(filt.column);

      switch (filt.comparison) {
      case 'maior que': planFilter = renderFilters
        .filter((result) => +result[filt.column] > +filt.value
         && result[filt.column] !== 'unknown');
        setRenderFilters(planFilter);
        break;
      case 'menor que': planFilter = renderFilters
        .filter((result) => +result[filt.column] < +filt.value);
        setRenderFilters(planFilter);
        break;
      case 'igual a': planFilter = renderFilters
        .filter((result) => +result[filt.column] === +filt.value);
        setRenderFilters(planFilter);
        break;
      default: break;
      }
    });
  }, [buttonFilter]);

  console.log(filterOrd);

  useEffect(() => {
    const changeFilter = buttonFilter.length === 0 ? inputFilterName : renderFilters;
    setRenderPlanets(changeFilter);
  }, [inputFilterName, renderFilters, buttonFilter]);

  return (
    <div>
      <form action="">
        <label htmlFor="input-filter">
          Filter
          <input
            data-testid="name-filter"
            onChange={ ({ target: { value } }) => setFilterName(value) }
            type="text"
            id="input-filter"
            value={ filterName }
          />
        </label>
        <select
          onChange={ ({ target: { value } }) => setFilterComumn(value) }
          data-testid="column-filter"
          value={ filterColumn }
        >
          { filterOptions
            .map((option, i) => <option key={ i } value={ option }>{option}</option>)}
        </select>
        <select
          onChange={ ({ target: { value } }) => setComparisonFilter(value) }
          data-testid="comparison-filter"
          name=""
          id=""
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <label htmlFor="inp">
          <input
            onChange={ ({ target: { value } }) => setFilterValue(value) }
            value={ filterValue }
            data-testid="value-filter"
            type="number"
            id="inp"
          />
        </label>
        <button
          onClick={ handleClick }
          data-testid="button-filter"
          type="button"
        >
          Filtrar
        </button>
      </form>
      { buttonFilter.map((filter, i) => (
        <div data-testid="filter" key={ i }>
          <p>{ `${filter.column} ${filter.comparison} ${filter.value}` }</p>
          <button
            onClick={ removeFilter }
            id={ filter.column }
            type="button"
          >
            Excluir

          </button>
        </div>))}
      { buttonFilter.length && (
        <button
          onClick={ removeAllFilters }
          data-testid="button-remove-filters"
          type="button"
        >
          Remover

        </button>)}
      <StarWarsSort />
      <table>
        <thead>
          <tr>
            { tableHeader.map((th, i) => <th key={ i }>{th}</th>)}
          </tr>
        </thead>
        <tbody>
          { renderPlanets.map((result, i) => (
            <tr key={ i }>
              {/* { changeFilter.map((e, index) => <td key={ index }>{Object.values(e)}</td>)} */}
              <td data-testid="planet-name">{result.name}</td>
              <td>{result.rotation_period}</td>
              <td>{result.orbital_period}</td>
              <td>{result.diameter}</td>
              <td>{result.climate}</td>
              <td>{result.gravity}</td>
              <td>{result.terrain}</td>
              <td>{result.surface_water}</td>
              <td>{result.population}</td>
              <td>{result.films}</td>
              <td>{result.created}</td>
              <td>{result.edited}</td>
              <td>{result.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StarWarsTable;
