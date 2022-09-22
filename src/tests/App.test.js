import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

test('I am your test', async () => {
  render(<App />);
  const textElement = screen.getByText(/rotation period/i);
  expect(textElement).toBeInTheDocument();

  const inputFilter = screen.getByLabelText('Filter');

  expect(inputFilter).toBeInTheDocument();

  userEvent.type(inputFilter, 'oo');


  const buttonFilter = screen.getByRole('button', { name: /filtrar/i })

  expect(buttonFilter).toBeInTheDocument();

  userEvent.click(buttonFilter);

  const selectedFilter1 = screen.getByRole('option', { name: /maior que/i })
  const selectedFilter2 = screen.getByRole('option', { name: /menor que/i })
  const selectedFilter3 = screen.getByRole('option', { name: /igual a/i })

  userEvent.click(selectedFilter1);
  userEvent.click(selectedFilter2);
  userEvent.click(selectedFilter3);


  // const textNotFilter = await screen.findByText('Endor');

  // await waitFor(() => expect(textNotFilter).not.toBeInTheDocument())
});

test('', () => {
  render(<App />);

  const selectedFilter1 = screen.getByRole('option', { name: /maior que/i })
  // const selectedFilter2 = screen.getByRole('option', { name: /menor que/i })
  // const selectedFilter3 = screen.getByRole('option', { name: /igual a/i })

  expect(selectedFilter1).toBeInTheDocument();

  userEvent.click(selectedFilter1);
  // userEvent.click(selectedFilter2);
  // userEvent.click(selectedFilter3);

  const selectedColumn = screen.getByRole('option', { name: /population/i })

  expect(selectedColumn).toBeInTheDocument();

  userEvent.click(selectedColumn);


})
