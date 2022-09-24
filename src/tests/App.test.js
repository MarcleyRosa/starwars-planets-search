import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import testData from '../../cypress/mocks/testData';



describe('Tests components', () => {

  beforeEach(() => {
    global.fetch = jest.fn(async () => Promise.resolve({
        json: async () => Promise.resolve(testData),
    }));
  })

test('I am your test', async () => {
    render(<App />);

    await waitFor(() => expect(global.fetch).toBeCalled());

  const textElement = screen.getByText(/rotation period/i);
  expect(textElement).toBeInTheDocument();

  const inputFilter = screen.getByLabelText('Filter');

  expect(inputFilter).toBeInTheDocument();

  userEvent.type(inputFilter, 'oo');


  const buttonFilter = screen.getByRole('button', { name: /filtrar/i })

  expect(buttonFilter).toBeInTheDocument();

  userEvent.click(buttonFilter);


  const selectedComparison = screen.getByTestId('comparison-filter');
  

  userEvent.selectOptions(selectedComparison, 'menor que');

  const selectColumn = screen.getByTestId('column-filter');

  userEvent.selectOptions(selectColumn, 'rotation_period');

  userEvent.click(buttonFilter);
});

test('', async () => {
  render(<App />);

  await waitFor(() => expect(global.fetch).toBeCalled());

  const selectedFilter1 = screen.getByRole('option', { name: /maior que/i });

  expect(selectedFilter1).toBeInTheDocument();

  userEvent.click(selectedFilter1);

  const inputValue = screen.getByTestId('value-filter')

  userEvent.type(inputValue, '100')

  const buttonFilter = screen.getByRole('button', { name: 'Filtrar'})

  userEvent.click(buttonFilter);

  const buttonRemove = screen.getByRole('button', { name: 'Excluir'})

  userEvent.click(buttonRemove);

  userEvent.click(buttonFilter);

  const buttonAllRemove = screen.getByRole('button', { name: 'Remover'})

  userEvent.click(buttonAllRemove);

})
test('Test component sort', async () => {
  render(<App />);
  await waitFor(() => expect(global.fetch).toBeCalled());
  const selectedSort = screen.getByTestId('column-sort');

  expect(selectedSort).toBeInTheDocument();

  userEvent.selectOptions(selectedSort, 'population');

  const checkboxSortAsc = screen.getByLabelText('Ascendente')

  expect(checkboxSortAsc).toBeInTheDocument();

  userEvent.click(checkboxSortAsc);

  const buttonSort = screen.getByRole('button', { name: 'Ordenar'})

  expect(buttonSort).toBeInTheDocument();

  userEvent.click(buttonSort);



  const checkboxSortDesc = screen.getByLabelText('Descendente')

  expect(checkboxSortDesc).toBeInTheDocument();

  userEvent.click(checkboxSortDesc);
})
test('Test Filter igual a', async () => {
  render(<App />);
  await waitFor(() => expect(global.fetch).toBeCalled());

  const selectedComparison = screen.getByTestId('comparison-filter');

  const selectColumn = screen.getByTestId('column-filter');

  const buttonFilter = screen.getByRole('button', { name: /filtrar/i })

  userEvent.selectOptions(selectedComparison, 'igual a');

  userEvent.selectOptions(selectColumn, 'surface_water');

  userEvent.click(buttonFilter);

})

})
