import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event';

import Form from '../Form'

describe('Form', () => {
  test('Input change is handled by handleFormInput when field text changes', () => {
    const handleFormInputMock = jest.fn()

    render(<Form handleFormInput={handleFormInputMock} />)

    let nameInput = screen.getByLabelText("Name")
    let messageInput = screen.getByLabelText("Message")
    let slider = screen.getByLabelText("Amount to Donate")
    userEvent.type(nameInput, "Jon Snow")
    expect(handleFormInputMock).toBeCalled()
    expect(handleFormInputMock).toHaveBeenLastCalledWith("nameInput", "Jon Snow")

    userEvent.type(messageInput, "Good bye")
    expect(handleFormInputMock).toHaveBeenLastCalledWith("messageInput", "Good bye")

    fireEvent.change(slider, {
      target: { value: "100" }
    })

    expect(handleFormInputMock).toHaveBeenLastCalledWith("amountInput", "100")
  })

})
