import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Login() {
  const { results } = useContext(StarWarsContext);
  const [filterName, setFilterName] = useState('');
  const namesFilter = results
    .filter((e) => e.name.toUpperCase().includes(filterName.toUpperCase()));
  return (
    <div>
      <label htmlFor="input-filter">
        Filter
        <input
          data-testid="name-filter"
          onChange={ ({ target }) => setFilterName(target.value) }
          type="text"
          id="input-filter"
        />
      </label>
      <p>{filterName}</p>
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

export default Login;
