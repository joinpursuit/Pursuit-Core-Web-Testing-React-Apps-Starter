import React from 'react';
import { render } from '@testing-library/react';
import RecentDonations from '../RecentDonations';

const sampleDonations = [
  {
    name: 'John',
    caption: 'Here take a break from work',
    amount: 30
  },
  {
    name: 'Emily',
    caption: '',
    amount: 110
  },
  {
    name: 'Sam',
    caption: 'Go to miami',
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
