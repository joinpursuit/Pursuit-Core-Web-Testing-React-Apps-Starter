import React from 'react';
import { render, screen } from '@testing-library/react';
import DonationCard from '../DonationCard';

describe('DonationCard Component', () => {
  test('Display Donor name, message and ammount', () => {
    render(<DonationCard name="Alejo" message="Good Luck" amount="100" />)
    expect(screen.getByText("Alejo donated $100")).toBeInTheDocument()
    expect(screen.getByText("Good Luck")).toBeInTheDocument()
  })
})
