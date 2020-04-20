import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgressBar from '../ProgressBar'

describe('ProgressBar', () => {
  test('Displays the raised amount of total in the format: Raised $[amount] of $[total] in a heading', () => {
    const targetAmount = 1000
    const raisedAmount = 170

    render(<ProgressBar targetAmount={targetAmount} raisedAmount={raisedAmount} />)

    const raised = screen.getByText(`Raised $${raisedAmount} of`)
    const target = screen.getByText(`$${targetAmount}`)

    expect(raised).toBeInTheDocument();
    expect(raised.tagName).toBe('H2')

    expect(target).toBeInTheDocument();
    expect(target.tagName).toBe('SPAN')

    expect(target.parentElement).toBe(raised)
  })

  test('Displays progress bar with proper percentage', () => {
    const targetAmount = 1000
    const raisedAmount = 170
    const { getByRole } = render(<ProgressBar targetAmount={targetAmount} raisedAmount={raisedAmount} />)

    const progressText = (raisedAmount * 100 / targetAmount) + "%";
    const progressbar = getByRole('progressbar');
    expect(progressbar).toHaveTextContent(progressText)
    expect(progressbar.style.width).toBe(progressText)
  })
})
