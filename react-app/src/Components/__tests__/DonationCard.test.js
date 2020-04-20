import React from 'react';
import { render, screen } from '@testing-library/react';
import DonationCard from '../DonationCard';

test('DonorCard displays donor name, message and ammount', () => {

  // Render the component
  render(<DonationCard name="Alejo" message="Good Luck" amount="100" />)

  // Get elements by the expected text and expect them to be displaying
  const donationHeading = screen.getByText("Alejo donated $100")
  const donationMessage = screen.getByText("Good Luck")

  expect(donationHeading).toBeInTheDocument()
  expect(donationMessage).toBeInTheDocument()
})
