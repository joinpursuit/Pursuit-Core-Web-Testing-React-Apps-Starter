import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './Form';

describe('Form', () => {
  test('Displays four input controls: Name, Caption, Amount slider and Donate button', () => {
    const { getByPlaceholderText, getByRole, getByText } = render(<Form />)
    const nameInput = getByPlaceholderText('Jon Doe')
    const captionInput = getByPlaceholderText('Good luck')
    const slider = getByRole('slider')
    const donateButton = getByText('Donate')
    expect(nameInput).toBeInTheDocument()
    expect(captionInput).toBeInTheDocument()
    expect(slider).toBeInTheDocument()
    expect(donateButton).toBeInTheDocument()
  })

  test('Display info that is passed as props', () => {
    const formDonor = "Sponge Bob"
    const formCaption = "Come down here"
    const formAmount = 350
    const { getByDisplayValue, getByText } = render(
      <Form formDonor={formDonor} formCaption={formCaption} formAmount={formAmount} />
    )

    const nameInput = getByDisplayValue(formDonor)
    const captionInput = getByDisplayValue(formCaption)
    const amountDisplay = getByText(`$${formAmount}`)
    expect(nameInput).toBeInTheDocument()
    expect(captionInput).toBeInTheDocument()
    expect(amountDisplay).toBeInTheDocument()

  })

  test('handles input changes with handleFormInput when typing or editing a value', () => {
    const formDonor = "Sponge"
    const formCaption = "Come down"
    const formAmount = 350
    const handleFormInput = jest.fn()
    const { getByRole, getByDisplayValue } = render(
      <Form
        formDonor={formDonor}
        formCaption={formCaption}
        formAmount={formAmount}
        handleFormInput={handleFormInput}
      />
    )
    const nameInput = getByDisplayValue(formDonor)
    const captionInput = getByDisplayValue(formCaption)
    const slider = getByRole('slider')

    userEvent.type(nameInput, " Bob")
    expect(handleFormInput).toHaveBeenLastCalledWith("nameInput", " Bob")

    userEvent.type(captionInput, " here")
    expect(handleFormInput).toHaveBeenLastCalledWith("captionInput", " here")

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
