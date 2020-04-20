import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import App from './App';
import axiosMock from 'axios'

jest.mock('axios')

describe("App", () => {
  test('Renders the GoFundMe header', () => {
    const { getByText } = render(<App />);
    const header = getByText(/Go Fund/i);
    expect(header).toBeInTheDocument();
  });

  test("Form input values are updated as content is entered in them", () => {
    render(<App />)

    const nameInput = screen.getByPlaceholderText('Jon Doe')
    const captionInput = screen.getByPlaceholderText('Good luck')
    const amountSlider = screen.getByRole('slider')

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
    expect(screen.getByDisplayValue(nameText)).toBeInTheDocument()

    // Caption Input
    expect(screen.getByDisplayValue(captionText)).toBeInTheDocument()

    // Amount slider
    // This is an interesting example because we want to test that the
    // slider value changed
    expect(amountSlider.value).toBe(amount)

    // And we also want to test that slider changes reflect in the p tag 
    // that displays the actual amount to the user
    expect(screen.getByText(`$${amount}`)).toBeInTheDocument()
  })

  test("Submitting a donation makes a POST request to API/posts and adds a new recent donation", async () => {
    axiosMock.post.mockResolvedValueOnce({
      data: {
        "name": "James Bond",
        "caption": "Bon Voyage ",
        "amount": "500",
        "id": 101
      }
    })

    // Render the App
    render(<App />)

    // Find elements that are rendering in the screen. We could consider this an 
    // implicit assertion because if the elements are not found the test will fail
    const nameInput = screen.getByPlaceholderText('Jon Doe')
    const captionInput = screen.getByPlaceholderText('Good luck')
    const amountSlider = screen.getByRole('slider')
    const donateButton = screen.getByText('Donate')

    // Fire events
    userEvent.type(nameInput, "James Bond")
    userEvent.type(captionInput, "Bon Voyage")
    fireEvent.change(amountSlider, { target: { value: "500" } })
    userEvent.click(donateButton)

    // Expect that that axios.post was called with the correct values
    expect(axiosMock.post).toHaveBeenCalledTimes(1)
    expect(axiosMock.post).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts", {
      amount: "500",
      caption: "Bon Voyage",
      name: "James Bond"
    })

    // Wait and expect that after the async operation (Net request) 
    // a new donation is displayed to the user
    const donationHeader = await screen.findByText("James Bond donated $500")
    expect(donationHeader.tagName).toBe("H5")

    const donationCaptionP = await screen.findByText("Bon Voyage")
    expect(donationCaptionP.tagName).toBe("P")
  })

  test("Submitting a donation resets all fields to its default", async () => {
    axiosMock.post.mockResolvedValueOnce({
      data: {
        "name": "Sponge Bob",
        "caption": "Have a good time in the bottom of the ocean",
        "amount": "234",
        "id": 101
      }
    })

    render(<App />)

    const nameInput = screen.getByPlaceholderText('Jon Doe')
    const captionInput = screen.getByPlaceholderText('Good luck')
    const amountSlider = screen.getByRole('slider')
    const donateButton = screen.getByText('Donate')

    // Fire events
    userEvent.type(nameInput, "Sponge Bob")
    userEvent.type(captionInput, "Have a good time in the bottom of the ocean")
    fireEvent.change(amountSlider, { target: { value: "234" } })
    userEvent.click(donateButton)

    // Wait until caption paragraph element renders in the screen 
    await screen.findByText("Have a good time in the bottom of the ocean")

    // Assert that input fields were reset
    expect(nameInput).toHaveValue("")
    expect(captionInput).toHaveValue("")
    expect(amountSlider).toHaveValue("5")
  })

})
