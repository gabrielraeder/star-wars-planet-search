import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import mockData from './mock/mockData';
import userEvent from '@testing-library/user-event';

const planets = mockData.results.map((planet) => planet)

describe('Teste Aplicação', () => {
  it('tests fetch and initial state of app', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    render(<App/>)

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1))
    expect(screen.getByRole('heading', { name: 'STAR WARS' })).toBeInTheDocument();

    expect(screen.getAllByRole('row')).toHaveLength(11);
    expect(screen.getAllByRole('columnheader')).toHaveLength(13);


    planets.forEach((planet) => {
      expect(screen.getByRole('cell', { name: planet.name })).toBeInTheDocument();
    })
  })

  it('tests text input filter', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    render(<App/>)

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1))

    const input = screen.getByTestId('name-filter');
    expect(input).toBeInTheDocument();

    userEvent.type(input, 'o');
    expect(screen.getAllByRole('row')).toHaveLength(8);

    userEvent.type(input, 'o');
    expect(input).toHaveValue('oo')

    expect(screen.getAllByRole('row')).toHaveLength(3);

    userEvent.clear(input)
    expect(screen.getAllByRole('row')).toHaveLength(11);
  })

  it('tests number filters', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    render(<App/>)

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1))

    const columnFilter = screen.getByTestId('column-filter')
    expect(columnFilter).toHaveValue('population');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    expect(comparisonFilter).toHaveValue('maior que');
    const valueFilter = screen.getByTestId('value-filter');
    expect(valueFilter).toBeInTheDocument();

    userEvent.selectOptions(columnFilter, 'diameter');
    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.clear(valueFilter)
    userEvent.type(valueFilter, '8900');

    userEvent.click(screen.getByRole('button', { name: 'Filtrar' }))

    expect(columnFilter).toHaveValue('population');
    const h5 = screen.getByRole('heading', { level: 5, name: /diameter/i})
    
    expect(h5).toHaveTextContent('diameter | menor que | 8900');

    userEvent.selectOptions(columnFilter, 'rotation_period');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.clear(valueFilter)
    userEvent.type(valueFilter, '18');

    userEvent.click(screen.getByRole('button', { name: 'Filtrar' }))

    expect(screen.getAllByRole('heading', { level: 5 })[1]).toHaveTextContent('rotation_period | maior que | 18');

    expect(screen.getAllByRole('row')).toHaveLength(2);

    userEvent.click(screen.getAllByRole('button', { name: 'X' })[0])

    expect(screen.getAllByRole('row')).toHaveLength(9);

    userEvent.click(screen.getByRole('button', { name: 'Remover Filtragens' }))

    expect(h5).not.toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(11);

    userEvent.selectOptions(columnFilter, 'population');
    userEvent.selectOptions(comparisonFilter, 'igual a');
    userEvent.clear(valueFilter)
    userEvent.type(valueFilter, '200000');

    userEvent.click(screen.getByRole('button', { name: 'Filtrar' }))

    expect(screen.getByRole('heading', { level: 5 })).toHaveTextContent('population | igual a | 200000');

    expect(screen.getAllByRole('row')).toHaveLength(2);
  })

  it('tests typing while number filter active', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    render(<App/>)

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1))

    const columnFilter = screen.getByTestId('column-filter')
    expect(columnFilter).toHaveValue('population');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    expect(comparisonFilter).toHaveValue('maior que');
    const valueFilter = screen.getByTestId('value-filter');
    expect(valueFilter).toBeInTheDocument();

    userEvent.selectOptions(columnFilter, 'diameter');
    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.clear(valueFilter)
    userEvent.type(valueFilter, '8900');

    userEvent.click(screen.getByRole('button', { name: 'Filtrar' }))

    const input = screen.getByTestId('name-filter');

    userEvent.type(input, 'o');
    expect(screen.getAllByRole('row')).toHaveLength(8);
  })

  it('tests sorting functions', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    render(<App/>)

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1))

    const inputsortColumn = screen.getByTestId('column-sort')
    const sortASC = screen.getByTestId('column-sort-input-asc')
    const sortDESC = screen.getByTestId('column-sort-input-desc')

    userEvent.selectOptions(inputsortColumn, 'rotation_period');
    userEvent.click(sortASC);

    userEvent.click(screen.getByRole('button', { name: 'Ordenar'}));

    const rows = screen.getAllByRole('row');

    expect(rows[1].children[0]).toHaveTextContent('Bespin');
    expect(rows[1].children[1]).toHaveTextContent('12');
    expect(rows[2].children[0]).toHaveTextContent('Endor');
    expect(rows[9].children[0]).toHaveTextContent('Naboo');

    userEvent.selectOptions(inputsortColumn, 'population');
    userEvent.click(sortDESC);

    userEvent.click(screen.getByRole('button', { name: 'Ordenar'}));

    expect(rows[1].children[0]).toHaveTextContent('Coruscant');
    expect(rows[1].children[4]).toHaveTextContent('temperate');
    expect(rows[4].children[0]).toHaveTextContent('Kamino');
    expect(rows[8].children[0]).toHaveTextContent('Yavin IV');


  })
})

// it('', () => {
  
// })
