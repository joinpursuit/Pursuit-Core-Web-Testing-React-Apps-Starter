import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

describe('Header component', () => {
  test('Renders Go Fund Me header', () => {
    const { container, getByRole } = render(<Header />)
    const header = getByRole('heading')
    expect(header.textContent).toBe('Go Fund Mo')
    expect(container).toMatchSnapshot()
  })
})

