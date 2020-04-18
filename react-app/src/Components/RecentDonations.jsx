import React from 'react';
import DonationCard from './DonationCard'

const RecentDonations = props => {
    const allDonators = props.donations.map((donator, index) => {
        return <DonationCard
            key={donator.name + index}
            name={donator.name}
            caption={donator.caption}
            amount={donator.amount}
        />
    });

    return (
        <ul className="col-4 list-unstyled recent-donations">
            <h5 className='my-4'>Recent Donations</h5>
            {allDonators}
        </ul>
    )
}

export default RecentDonations;
