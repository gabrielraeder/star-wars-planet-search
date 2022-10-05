import React, { useContext, useState } from 'react';
import Context from '../context/Context';
import { typeArray } from '../context/Provider';

export default function SortFilter() {
  const { setOrder } = useContext(Context);

  const [column, setColumn] = useState('population');
  const [sort, setSort] = useState('ASC');

  const handleChange = (value, set) => {
    set(value);
  };

  const handleClick = () => {
    const newFilter = {
      column,
      sort,
    };
    setOrder(newFilter);
  };

  return (
    <div>
      <select
        name="columnSort"
        id="columnSort"
        data-testid="column-sort"
        value={ column }
        onChange={ ({ target: { value } }) => handleChange(value, setColumn) }
      >
        { typeArray.map((item) => (
          <option key={ item } value={ item }>{item}</option>
        ))}
      </select>
      <label htmlFor="input-asc">
        Ascendente
        <input
          id="input-asc"
          data-testid="column-sort-input-asc"
          type="radio"
          value="ASC"
          name="sort"
          onChange={ () => setSort('ASC') }
        />
      </label>
      <label htmlFor="input-desc">
        Descendente
        <input
          id="input-desc"
          data-testid="column-sort-input-desc"
          type="radio"
          value="DESC"
          name="sort"
          onChange={ () => setSort('DESC') }
        />
      </label>

      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleClick }
      >
        Ordenar
      </button>
    </div>
  );
}
