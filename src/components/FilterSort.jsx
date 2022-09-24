import React, { useContext, useState, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function StarWarsSort() {
  const columnAll = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  const { setFilterOrd, filterOrd, renderPlanets,
    setRenderPlanets } = useContext(StarWarsContext);

  const [filterColumn, setFilterComumn] = useState('population');
  const [ord, setOrd] = useState('');

  useEffect(() => {
    const choisenColumn = (obj) => obj[filterOrd.order.column];

    const filterUnknown = renderPlanets
      .filter((planet) => choisenColumn(planet) === 'unknown');

    const filterNotUnknown = renderPlanets
      .filter((planet) => choisenColumn(planet) !== 'unknown');

    const ASC = -1;
    const DESC = 1;

    const isTrue = filterOrd.order.sort === 'ASC' ? ASC : DESC;
    const isFalse = filterOrd.order.sort === 'ASC' ? DESC : ASC;

    const mapFilter = filterNotUnknown
      .sort((a, b) => (
        +choisenColumn(a) < +choisenColumn(b) ? isTrue : isFalse
      ));
    filterUnknown.map((e) => mapFilter.push(e));
    setRenderPlanets(mapFilter);
  }, [filterOrd]);

  return (
    <div>
      <form action="">
        <select
          onChange={ ({ target: { value } }) => setFilterComumn(value) }
          value={ filterColumn }
          data-testid="column-sort"
        >
          { columnAll
            .map((option, i) => <option key={ i } value={ option }>{option}</option>)}
        </select>
        <label htmlFor="asc">
          Ascendente
          <input
            onClick={ ({ target: { value } }) => setOrd(value) }
            type="radio"
            name=""
            id="asc"
            value="ASC"
            data-testid="column-sort-input-asc"
          />
        </label>
        <label htmlFor="desc">
          Descendente
          <input
            onClick={ ({ target: { value } }) => setOrd(value) }
            type="radio"
            name=""
            id="desc"
            value="DESC"
            data-testid="column-sort-input-desc"
          />
        </label>
        <button
          onClick={ () => setFilterOrd({ order: { column: filterColumn, sort: ord } }) }
          type="button"
          data-testid="column-sort-button"
        >
          Ordenar

        </button>
      </form>
    </div>
  );
}

export default StarWarsSort;
