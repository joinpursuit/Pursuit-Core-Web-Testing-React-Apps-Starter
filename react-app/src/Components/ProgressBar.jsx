import React from 'react';

const ProgressBar = props => {
    const { targetAmount, raisedAmount } = props
    const progress = raisedAmount * 100 / targetAmount;
    const style = {
        width: `${progress}%`
    }

    return (
        <div>
            <h2 className='mb-4'>Raised ${raisedAmount} of <span className='text-muted'>${targetAmount}</span></h2>
            <div className="progress">
                <div className="progress-bar bg-success"
                    role="progressbar"
                    style={style}
                    aria-valuenow={raisedAmount}
                    aria-valuemin="0"
                    aria-valuemax="1000"
                >{progress}%</div>
            </div>
        </div>
    )
}

export default ProgressBar;
