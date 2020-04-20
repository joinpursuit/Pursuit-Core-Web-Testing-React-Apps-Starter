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

  it("Submitting a donation makes a POST request to API/posts", async () => {
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
    // a new p tag with "Bon Voyage" was added  to the recent donations list
    let caption = await screen.findByText("Bon Voyage")
    expect(caption.tagName).toBe("P")
  })

  it("Submitting a donation resets all fields to its default", async () => {
    const {
      getByPlaceholderText,
      getByRole,
      getByText,
    } = render(<App />)

    const nameInput = getByPlaceholderText('Jon Doe')
    const captionInput = getByPlaceholderText('Good luck')
    const amountSlider = getByRole('slider')
    const donateButton = getByText('Donate')

    // Fire events
    userEvent.type(nameInput, "Sponge Bob")
    userEvent.type(captionInput, "Have a good time in the bottom of the ocean")
    fireEvent.change(amountSlider, { target: { value: "234" } })
    userEvent.click(donateButton)

    expect(nameInput).toHaveValue("")
    expect(captionInput).toHaveValue("")
    expect(amountSlider).toHaveValue("5")


  })

  it("Submitting a donation adds a new donation to the list of recent donations", () => {

    const {
      getByPlaceholderText,
      getByRole,
      getByText,
    } = render(<App />)

    const nameInput = getByPlaceholderText('Jon Doe')
    const captionInput = getByPlaceholderText('Good luck')
    const amountSlider = getByRole('slider')
    const donateButton = getByText('Donate')

    // Fire events
    userEvent.type(nameInput, "Sponge Bob")
    userEvent.type(captionInput, "Have a good time in the bottom of the ocean")
    fireEvent.change(amountSlider, { target: { value: "234" } })
    userEvent.click(donateButton)

    expect(getByText('Sponge Bob donated $234')).toBeInTheDocument();
    expect(getByText("Have a good time in the bottom of the ocean")).toBeInTheDocument();

    // Fire events
    userEvent.type(nameInput, "Jon Snow")
    userEvent.type(captionInput, "See you in Winterfell")
    fireEvent.change(amountSlider, { target: { value: "12" } })
    userEvent.click(donateButton)

    expect(getByText('Jon Snow donated $12')).toBeInTheDocument();
    expect(getByText("See you in Winterfell")).toBeInTheDocument();

  })

})
