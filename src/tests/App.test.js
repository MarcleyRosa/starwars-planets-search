import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import mockFetch from '../../cypress/mocks/fetch';
import testData from '../../cypress/mocks/testData';



describe('Tests components', () => {

  beforeEach(() => {
    global.fetch = jest.fn(async () => Promise.resolve({
        json: async () => Promise.resolve(testData),
    }));
  })

test('I am your test', async () => {
  mockFetch()
    render(<App />);

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

  userEvent.selectOptions(selectedComparison, 'igual a');

  userEvent.selectOptions(selectColumn, 'surface_water');

  userEvent.click(buttonFilter);

  // const textNotFilter = await screen.findByText('Endor');

  // await waitFor(() => expect(textNotFilter).not.toBeInTheDocument())
});

test('', () => {
  render(<App />);

  const selectedFilter1 = screen.getByRole('option', { name: /maior que/i });

  expect(selectedFilter1).toBeInTheDocument();

  userEvent.click(selectedFilter1);

})
test('Test component sort', () => {
  render(<App />);
  const selectedSort = screen.getByTestId('column-sort');

  expect(selectedSort).toBeInTheDocument();

  userEvent.selectOptions(selectedSort, 'diameter');

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

})
