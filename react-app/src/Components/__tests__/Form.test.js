import React from 'react';
import { render, fireEvent, screen, getByLabelText } from '@testing-library/react';
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
    const handleFormInputMock = jest.fn()

    render(<Form formDonor={""} formMessage={""} formAmount={""} handleFormInput={handleFormInputMock} />)

    const nameInput = screen.getByLabelText("Name")
    const messageInput = screen.getByLabelText("Message")
    const slider = screen.getByLabelText('Amount to Donate')

    userEvent.type(nameInput, "Bob")
    expect(handleFormInputMock).toHaveBeenCalled()
    expect(handleFormInputMock).toHaveBeenLastCalledWith("nameInput", "Bob")

    userEvent.type(messageInput, "Here to support")
    expect(handleFormInputMock).toHaveBeenLastCalledWith("messageInput", "Here to support")

    fireEvent.change(slider, { target: { value: 500 } })
    expect(handleFormInputMock).toHaveBeenLastCalledWith("amountInput", "500")
  })

  test('Handle form submission with handleSubmit', () => {
    const handleSubmit = jest.fn()
    render(<Form handleSubmit={handleSubmit} />)

    const form = screen.getByTestId('form')
    fireEvent.submit(form)
    expect(handleSubmit).toHaveBeenCalled()
  })

  // Test passes but error is logged 
  // see: https://kula.blog/posts/test_on_submit_in_react_testing_library/)
  // test.skip('Handle form submission with handleSubmit by clicking the Donate button', () => {
  //   const handleSubmit = jest.fn()
  //   render(<Form handleSubmit={handleSubmit} />)

  //   const donateButton = screen.getByText('Donate')
  //   // console.log(donateButton)
  //   userEvent.click(donateButton)
  //   expect(handleSubmit).toHaveBeenCalled()
  // })


  // Can't be done here because requires state and state is in the parent component (App)
  // it.skip('Inputs get cleared on submit', () => { })

  // Can't be done here because requires state and state is in the parent component (App)
  // it.skip('Values entered in form displays in respective places', () => { })

})
