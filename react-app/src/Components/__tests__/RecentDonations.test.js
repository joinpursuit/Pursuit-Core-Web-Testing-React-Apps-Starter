import React from 'react';
import { render } from '@testing-library/react';
import RecentDonations from '../RecentDonations';

const sampleDonations = [
  {
    name: 'John',
    message: 'Here take a break from work',
    amount: 30
  },
  {
    name: 'Emily',
    message: '',
    amount: 110
  },
  {
    name: 'Sam',
    message: 'Go to miami',
    amount: 30
  }
]

describe('RecentDonations', () => {
  test('Displays a list of donation cards', () => {
    const { container, getAllByText } = render(<RecentDonations donations={sampleDonations} />)
    expect(getAllByText(/donated/).length).toBe(sampleDonations.length)
    expect(container).toMatchSnapshot()
  })
})
