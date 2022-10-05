import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

export const typeArray = ['population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water'];

export default function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState(planets);
  const [filterByName, setfilterByName] = useState({ name: '' });
  const [columnOptions, setColumnOptions] = useState(typeArray);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [filteredByNumberPlanets, setFilteredByNumberPlanets] = useState(planets);
  const [order, setOrder] = useState({});

  const fetchPlanetsList = async () => {
    const url = 'https://swapi.dev/api/planets';
    const { results } = await fetch(url)
      .then((response) => response.json()).then((data) => data);
    const mapped = results.map((result) => {
      delete result.residents;
      return result;
    });
    setPlanets(mapped);
    setFilteredByNumberPlanets(mapped);
  };

  useEffect(() => {
    fetchPlanetsList();
  }, []);

  useEffect(() => {
    const { name } = filterByName;
    const filterByText = planets
      .filter((p) => p.name.toLowerCase().includes(name.toLowerCase()));
    setFilteredPlanets(filterByText);
    if (name === '') setFilteredPlanets(planets);
  }, [filterByName, planets]);

  useEffect(() => {
    if (filterByNumericValues.length === 0) {
      setFilteredByNumberPlanets(filteredPlanets);
    }
    filterByNumericValues.forEach((filter) => {
      let filtered = [];
      switch (filter.comparison) {
      // case 'maior que':
      //   filtered = filteredByNumberPlanets
      //     .filter((planet) => (Number(planet[filter.column]) > Number(filter.value)
      //       && planet[filter.column] !== 'unknown'));
      //   setFilteredByNumberPlanets(filtered);
      //   break;
      case 'menor que':
        filtered = filteredByNumberPlanets
          .filter((planet) => (Number(planet[filter.column]) < Number(filter.value)
            && planet[filter.column] !== 'unknown'));
        setFilteredByNumberPlanets(filtered);
        break;
      case 'igual a':
        filtered = filteredByNumberPlanets
          .filter((planet) => (Number(planet[filter.column]) === Number(filter.value)
            && planet[filter.column] !== 'unknown'));
        setFilteredByNumberPlanets(filtered);
        break;
      default:
        filtered = filteredByNumberPlanets
          .filter((planet) => (Number(planet[filter.column]) > Number(filter.value)
            && planet[filter.column] !== 'unknown'));
        setFilteredByNumberPlanets(filtered);
        break;
      }
    });
  }, [filterByNumericValues]);

  const context = {
    planets,
    filterByName,
    filteredPlanets,
    columnOptions,
    filterByNumericValues,
    filteredByNumberPlanets,
    order,
    fetchPlanetsList,
    setfilterByName,
    setFilterByNumericValues,
    setColumnOptions,
    setFilteredByNumberPlanets,
    setOrder,
  };

  return (
    <Context.Provider value={ context }>{children}</Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
