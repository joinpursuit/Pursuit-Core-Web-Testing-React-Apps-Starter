import React from 'react';

const Form = (props) => {

  const { formDonor, formMessage, formAmount, handleSubmit, handleFormInput } = props

  const handleInputChange = (event) => {
    const id = event.target.id;
    const value = event.target.value
    handleFormInput(id, value)
  }

  return (
    <form onSubmit={handleSubmit} data-testid="form">
      <div className="form-group">
        <label htmlFor='nameInput'>Name</label>
        <input
          type="text"
          placeholder="Jon Doe"
          className="form-control"
          id="nameInput"
          value={formDonor}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor='messageInput'>message</label>
        <input
          type="text"
          placeholder="Good luck"
          className="form-control"
          id="messageInput"
          value={formMessage}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor='amountInput'>Amount to Donate</label>
        <input
          type="range"
          className="custom-range"
          id="amountInput"
          min="5"
          max="1000"
          value={formAmount}
          onChange={handleInputChange}
        />
        <blockquote className="blockquote text-right">
          <p className="h3 mb-0">${formAmount}</p>
          <button type="submit" className="btn btn-lg btn-success my-4">Donate</button>
        </blockquote>
      </div>
    </form>
  )
}

export default Form;
