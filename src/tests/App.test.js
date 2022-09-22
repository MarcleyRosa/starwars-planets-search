import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import requestData from './helps/data'


describe('Tests components', () => {

  // beforeEach(() => {
  //   global.fetch = jest.fn(async () => Promise.resolve({
  //       json: async () => Promise.resolve(requestData),
  //   }));
  // })

test('I am your test', async () => {
  // global.fetch = jest.fn(async () => Promise.resolve({
  //     json: async () => Promise.resolve(requestData),
  //   }));
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

  const selectedColumn = screen.getByRole('option', { name: /population/i });

  expect(selectedColumn).toBeInTheDocument();

  userEvent.click(selectedColumn);


})

})
