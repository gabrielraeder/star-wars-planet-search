import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';

export default function Table() {
  const {
    filteredPlanets,
    planets,
    filterByNumericValues,
    setFilterByNumericValues,
    setColumnOptions,
    filteredByNumberPlanets,
    setFilteredByNumberPlanets,
    filterByName: { name },
    order } = useContext(Context);

  const [exibitPlanets, setExibitPlanets] = useState(filteredPlanets);

  // useEffect(() => {
  //   setExibitPlanets(filteredByNumberPlanets
  //     .length === 0 ? filteredPlanets : filteredByNumberPlanets);
  // }, [planets]);

  useEffect(() => {
    setExibitPlanets(filteredByNumberPlanets);
  }, [filteredByNumberPlanets, setFilteredByNumberPlanets]);

  const excludeFilter = (column) => {
    setFilterByNumericValues((prev) => (prev.filter((i) => i.column !== column)));
    setFilteredByNumberPlanets(filteredPlanets);
    setColumnOptions((prev) => ([...prev, column]));
  };

  const arePlanets = planets.length > 0;

  const showPlanets = exibitPlanets.length > 0 ? exibitPlanets : planets;

  // const showWhichFilter = name ? filteredPlanets : showPlanets;

  const sortIt = () => {
    const showWhichFilter = name ? filteredPlanets : showPlanets;
    if (!order.sort) return showWhichFilter;
    const { column } = order;
    const noUnknown = showWhichFilter.filter((p) => p[column] !== 'unknown');
    const unknown = showWhichFilter.filter((p) => p[column] === 'unknown');
    const ascendent = [...noUnknown];
    ascendent.sort((a, b) => a[column] - b[column]);
    const descendent = [...noUnknown];
    descendent.sort((a, b) => b[column] - a[column]);
    if (order.sort === 'DESC') {
      return [...descendent, ...unknown];
    }
    return [...ascendent, ...unknown];
  };

  return (
    <div>
      <div>
        {filterByNumericValues.map((item, index) => (
          <div data-testid="filter" key={ index } className="filterList">
            <h5>{`${item.column} | ${item.comparison} | ${item.value}`}</h5>
            <button type="button" onClick={ () => excludeFilter(item.column) }>X</button>
          </div>
        ))}
      </div>
      <table>
        <thead>
          <tr>
            { arePlanets && Object
              .keys(planets[0]).map((title, i) => (<th key={ i }>{title}</th>))}
          </tr>
        </thead>
        <tbody>
          {
            sortIt().map((p, i) => (
              <tr key={ i }>
                {Object.values(p).map((value, ind) => {
                  if (ind === 0) {
                    return (
                      <td
                        key={ ind }
                        data-testid="planet-name"
                      >
                        { value }
                      </td>
                    );
                  }
                  return (
                    <td
                      key={ ind }
                    >
                      { value }
                    </td>
                  );
                })}
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
