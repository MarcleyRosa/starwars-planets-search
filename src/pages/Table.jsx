import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function StarWarsTable() {
  const { results } = useContext(StarWarsContext);
  const [filterName, setFilterName] = useState('');
  const [filterColumn, setFilterComumn] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [filterValue, setFilterValue] = useState(0);
  // const [renderFilters, setRenderFilters] = useState(false);

  const [buttonFilter, setButtonFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const filterNumberSwitch = () => {
    const switchColumn = (result) => {
      switch (buttonFilter.column) {
      case 'population': return result.population;
      case 'orbital_period': return result.orbital_period;
      case 'diameter': return result.diameter;
      case 'rotation_period': return result.rotation_period;
      default: return result.surface_water;
      }
    };

    const maiorQue = results
      .filter((result) => +switchColumn(result) > +buttonFilter.value)
      .filter((unk) => switchColumn(unk) !== 'unknown');
    const menorQue = results
      .filter((result) => +switchColumn(result) < +buttonFilter.value);
    const igualA = results
      .filter((result) => +switchColumn(result) === +buttonFilter.value);

    if (buttonFilter.isClick) {
      // setRenderFilters((prevState) => ({
      //   ...prevState,
      //   list: [buttonFilter],
      // }));
      console.log('entrei');
      switch (buttonFilter.comparison) {
      case 'menor que': return menorQue;
      case 'igual a': return igualA;
      default: return maiorQue;
      }
    } else {
      return results;
    }
  };

  console.log(filterNumberSwitch());

  const namesFilter = filterNumberSwitch()
    .filter((e) => e.name.toUpperCase().includes(filterName.toUpperCase()));

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
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
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
          onClick={ () => setButtonFilter({
            column: filterColumn,
            comparison: comparisonFilter,
            value: filterValue,
            isClick: true,
          }) }
          data-testid="button-filter"
          type="button"
        >
          Filtrar
        </button>
      </form>
      <p>{`Filtr${filterName}`}</p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          { namesFilter.map((result, i) => (
            <tr key={ i }>
              <td>{result.name}</td>
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
