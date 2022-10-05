import React from 'react';
import './App.css';
import Provider from './context/Provider';
import Table from './components/Table';
import TextFilter from './components/TextFilter';
import NumberFilter from './components/NumberFilter';

function App() {
  return (
    <Provider>
      <header><h1>STAR WARS</h1></header>
      <TextFilter />
      <NumberFilter />
      <Table />
    </Provider>
  );
}

export default App;
