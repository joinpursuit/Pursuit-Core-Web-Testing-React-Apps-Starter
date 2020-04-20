import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from '../Form';

describe('Form', () => {
  test('Displays four input controls: Name, message, Amount slider and Donate button', () => {
    const { getByPlaceholderText, getByRole, getByText } = render(<Form />)
    const nameInput = getByPlaceholderText('Jon Doe')
    const messageInput = getByPlaceholderText('Good luck')
    const slider = getByRole('slider')
    const donateButton = getByText('Donate')
    expect(nameInput).toBeInTheDocument()
    expect(messageInput).toBeInTheDocument()
    expect(slider).toBeInTheDocument()
    expect(donateButton).toBeInTheDocument()
  })

  test('Display info that is passed as props', () => {
    const formDonor = "Sponge Bob"
    const formMessage = "Come down here"
    const formAmount = 350
    const { getByDisplayValue, getByText } = render(
      <Form formDonor={formDonor} formMessage={formMessage} formAmount={formAmount} />
    )

    const nameInput = getByDisplayValue(formDonor)
    const messageInput = getByDisplayValue(formMessage)
    const amountDisplay = getByText(`$${formAmount}`)
    expect(nameInput).toBeInTheDocument()
    expect(messageInput).toBeInTheDocument()
    expect(amountDisplay).toBeInTheDocument()

  })

  test('handles input changes with handleFormInput when typing or editing a value', () => {
    const formDonor = "Sponge"
    const formMessage = "Come down"
    const formAmount = 350
    const handleFormInput = jest.fn()
    const { getByRole, getByDisplayValue } = render(
      <Form
        formDonor={formDonor}
        formMessage={formMessage}
        formAmount={formAmount}
        handleFormInput={handleFormInput}
      />
    )
    const nameInput = getByDisplayValue(formDonor)
    const messageInput = getByDisplayValue(formMessage)
    const slider = getByRole('slider')

    userEvent.type(nameInput, " Bob")
    expect(handleFormInput).toHaveBeenLastCalledWith("nameInput", " Bob")

    userEvent.type(messageInput, " here")
    expect(handleFormInput).toHaveBeenLastCalledWith("messageInput", " here")

    fireEvent.change(slider, { target: { value: 500 } })
    expect(handleFormInput).toHaveBeenLastCalledWith("amountInput", "500")
  })

  test('Handle form submission with handleSubmit', () => {
    const handleSubmit = jest.fn()
    const { getByTestId } = render(<Form handleSubmit={handleSubmit} />)

    const form = getByTestId('form')
    fireEvent.submit(form)
    expect(handleSubmit).toHaveBeenCalled()
  })

  // Can't be done here because requires state and state is in the parent component (App)
  // it.skip('Inputs get cleared on submit', () => { })

  // Can't be done here because requires state and state is in the parent component (App)
  // it.skip('Values entered in form displays in respective places', () => { })

})
