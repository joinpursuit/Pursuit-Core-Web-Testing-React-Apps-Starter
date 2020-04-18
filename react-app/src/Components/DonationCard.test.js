import React from 'react';
import { render } from '@testing-library/react';
import DonationCard from './DonationCard';

describe('DonationCard Component', () => {
  test('Display Donor name, message and ammount', () => {
    const { getByText } = render(<DonationCard name="Alejo" caption="Good Luck" amount="100" />)
    expect(getByText(/Alejo donated \$100/)).toBeInTheDocument()
    expect(getByText("Good Luck")).toBeInTheDocument()
  })
})
