import React from 'react';

const Donation = (props) => {
  return (
    <li className="media my-2">
      <div className="media-body">
        <h5 className="mt-0 mb-1">{props.name} donated ${props.amount}</h5>
        <p>{props.message}</p>
      </div>
    </li>
  )
}

export default Donation;
