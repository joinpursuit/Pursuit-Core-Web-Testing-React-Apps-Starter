import React from 'react';
import { render } from '@testing-library/react';
import ProgressBar from './ProgressBar';

describe('ProgressBar', () => {
  test('Displays amount raised of total', () => {
    const targetAmount = 1000
    const raisedAmount = 170
    const { getByRole } = render(<ProgressBar targetAmount={targetAmount} raisedAmount={raisedAmount} />)

    expect(getByRole('heading')).toHaveTextContent(`Raised $${raisedAmount} of $${targetAmount}`)
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
