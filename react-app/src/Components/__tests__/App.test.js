import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import App from '../../App'

// For mocking axios
import axiosMock from 'axios'

jest.mock('axios')

describe('App Component', () => {
  test("Submitting a donation makes a POST request to API/posts and adds a new recent donation", async () => {

    // ARRANGE
    // Mock network request with axios.post
    axiosMock.post.mockResolvedValueOnce({
      data: {
        name: "Jon Snow",
        message: "Winter is coming",
        amount: 123
      }
    })


    // Render the App
    render(<App />)

    // Find elements that are rendering in the screen. We could consider this an 
    // implicit assertion because if the elements are not found the test will fail
    const nameInput = screen.getByPlaceholderText('Jon Doe')
    const messageInput = screen.getByPlaceholderText('Good luck')
    const amountSlider = screen.getByRole('slider')
    const donateButton = screen.getByText('Donate')

    // ACT
    // Simulate user events (filling out form)
    userEvent.type(nameInput, "Jon Snow")
    userEvent.type(messageInput, "Winter is coming")
    fireEvent.change(amountSlider, {
      target: { value: "123" }
    })
    userEvent.click(donateButton)

    // ASSERT
    // A new donation appears on the screen
    let donationHeading = await screen.findByText("Jon Snow donated $123")
    expect(donationHeading).toBeInTheDocument()


    // axios.post was called
    expect(axiosMock.post).toHaveBeenCalled()

  })
})
