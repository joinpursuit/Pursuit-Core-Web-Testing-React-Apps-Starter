import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Renders the GoFundMe header', () => {
  const { getByText } = render(<App />);
  const header = getByText(/Go Fund/i);
  expect(header).toBeInTheDocument();
});
