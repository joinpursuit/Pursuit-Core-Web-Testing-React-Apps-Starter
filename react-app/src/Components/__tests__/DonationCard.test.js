import React from 'react';
import { render, screen } from '@testing-library/react'
import DonationCard from '../DonationCard'


test('DonationCard displays a donors name, amount and message pass through props', () => {
  // Render component
  render(<DonationCard name="Alejo" amount="356" message="I hope you have a good time" />)

  // .getByText and the like are queries that come from @testing-library/react
  // See docs for other queries
  let donationHeading = screen.getByText("Alejo donated $356")
  let messageP = screen.getByText('I hope you have a good time')

  let parent = donationHeading.parentElement

  expect(donationHeading).toBeInTheDocument()
  expect(donationHeading.tagName).toBe("H5")

  expect(messageP).toBeInTheDocument()
  expect(messageP.tagName).toBe("P")

  expect(parent.childNodes[0]).toBe(donationHeading)
  expect(parent.childNodes[1]).toBe(messageP)
})
