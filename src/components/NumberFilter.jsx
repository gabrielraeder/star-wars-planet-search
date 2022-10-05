import React, { useContext, useState, useEffect } from 'react';
import Context from '../context/Context';
import SortFilter from './SortFilter';

export default function NumberFilter() {
  const { columnOptions,
    setFilterByNumericValues,
    setColumnOptions } = useContext(Context);

  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);

  const handleChange = (value, set) => {
    set(value);
  };

  const handleClick = () => {
    const newFilter = {
      column: columnFilter,
      comparison: comparisonFilter,
      value: valueFilter,
    };
    setFilterByNumericValues((prev) => ([...prev, newFilter]));
    setColumnOptions((prev) => (prev.filter((i) => i !== columnFilter)));
  };

  useEffect(() => {
    setColumnFilter(columnOptions[0]);
    setComparisonFilter('maior que');
    setValueFilter(0);
  }, [setColumnOptions, columnOptions]);

  const handleRemoveAllFilters = () => {
    setFilterByNumericValues([]);
  };

  return (
    <div>
      <select
        name="columnFilter"
        id="columnFilter"
        data-testid="column-filter"
        value={ columnFilter }
        onChange={ ({ target: { value } }) => handleChange(value, setColumnFilter) }
      >
        { columnOptions.map((item) => (
          <option key={ item } value={ item }>{item}</option>
        ))}
      </select>

      <select
        name="comparisonFilter"
        id="comparisonFilter"
        data-testid="comparison-filter"
        value={ comparisonFilter }
        onChange={ ({ target: { value } }) => handleChange(value, setComparisonFilter) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        value={ valueFilter }
        onChange={ ({ target: { value } }) => handleChange(value, setValueFilter) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
      <SortFilter />
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ handleRemoveAllFilters }
      >
        Remover Filtragens
      </button>
    </div>
  );
}
