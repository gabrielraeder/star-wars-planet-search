import React, { useContext } from 'react';
import Context from '../context/Context';

export default function TextFilter() {
  const { filterByName: { name }, setfilterByName,
    setFilterByNumericValues,
    filterByNumericValues } = useContext(Context);

  const handleChange = ({ target: { value } }) => {
    setfilterByName((prev) => ({ ...prev, name: value }));
    if (filterByNumericValues.length > 0) setFilterByNumericValues([]);
  };

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        value={ name }
        onChange={ handleChange }
      />
    </div>
  );
}
