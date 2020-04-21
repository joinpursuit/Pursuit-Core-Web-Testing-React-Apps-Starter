import React from 'react';
import { render, screen } from '@testing-library/react'
import ProgressBar from '../ProgressBar';

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

  test("Progress bar has width according to percentage calculated as well as displays the percentage", () => {
    const targetAmount = 1000
    const raisedAmount = 500
    const percentage = (raisedAmount * 100) / targetAmount;

    render(<ProgressBar targetAmount={targetAmount} raisedAmount={raisedAmount} />)

    // screen.debug()
    const progressBar = screen.getByText(percentage + "%")
    expect(progressBar).toBeInTheDocument()
    expect(progressBar.style.width).toBe(percentage + "%")
  })
})
