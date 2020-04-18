import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe("App", () => {
  test('Renders the GoFundMe header', () => {
    const { getByText } = render(<App />);
    const header = getByText(/Go Fund/i);
    expect(header).toBeInTheDocument();
  });

  it("Updates form input values as content is entered in input fields", () => {
    const {
      getByPlaceholderText,
      getByRole,
      getByDisplayValue,
      getByText,
    } = render(<App />)

    const nameInput = getByPlaceholderText('Jon Doe')
    const captionInput = getByPlaceholderText('Good luck')
    const amountSlider = getByRole('slider')

    const nameText = "Sponge Bob"
    const captionText = "Have a good time in the bottom of the ocean"
    const amount = "234"

    // Inputs should start empty and default amount is "5"
    expect(nameInput.value).toBe("")
    expect(captionInput.value).toBe("")
    expect(amountSlider.value).toBe("5")

    // Fire events
    userEvent.type(nameInput, nameText)
    userEvent.type(captionInput, captionText)
    fireEvent.change(amountSlider, { target: { value: amount } })

    // Asserting that the input has an updated value
    // 1. We can literally check that the value is the new value
    expect(nameInput.value).toBe(nameText)

    // 2. Or check that we find an element in the page that by
    // getting by display value and passing the expected new value
    expect(getByDisplayValue(nameText)).toBeInTheDocument()

    // Caption Input
    expect(getByDisplayValue(captionText)).toBeInTheDocument()

    // Amount slider
    // This is an interesting example because we want to test that the
    // slider value changed
    expect(amountSlider.value).toBe(amount)

    // And we also want to test that slider changes reflect in the p tag 
    // that displays the actual amount to the user
    expect(getByText(`$${amount}`)).toBeInTheDocument()
  })

  it.todo("Submitting a donation add a new donation to the list of recent donations")
  it.todo("Submitting a donation makes a POST request to /donation")
})
