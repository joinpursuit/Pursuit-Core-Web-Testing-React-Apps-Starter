import React from 'react';
import './App.css';

import Header from './Components/Header';
import RecentDonations from './Components/RecentDonations';
import ProgressBar from './Components/ProgressBar';
import Form from './Components/Form'


class App extends React.Component {
  state = {
    targetAmount: 1000,
    raisedAmount: 170,
    donationCount: 3,
    donations: [
      {
        name: 'John',
        caption: 'Here take a break from work',
        amount: 30
      },
      {
        name: 'Emily',
        caption: '',
        amount: 110
      },
      {
        name: 'Sam',
        caption: 'Go to miami',
        amount: 30
      }
    ],
    formDonor: '',
    formCaption: '',
    formAmount: 5
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.formDonor) {
      const allDonations = [...this.state.donations];
      const newDonation = {
        name: this.state.formDonor,
        caption: this.state.formCaption,
        amount: this.state.formAmount
      }

      allDonations.push(newDonation);

      const total = this.state.raisedAmount + parseInt(this.state.formAmount);

      this.setState({
        donations: allDonations,
        raisedAmount: total,
        formDonor: '',
        formCaption: '',
        formAmount: 5
      })
    }
  }

  handleFormInput = (id, value) => {
    if (id === 'nameInput') {
      this.setState({ formDonor: value })
    } else if (id === 'captionInput') {
      this.setState({ formCaption: value })
    } else if (id === 'amountInput') {
      this.setState({ formAmount: value })
    }
  }

  // ######################### RENDER #############################
  render() {
    const {
      donations,
      raisedAmount,
      targetAmount,
      formDonor,
      formCaption,
      formAmount
    } = this.state

    return (
      <div className="App">
        <Header />

        <div className='container'>
          <div className='row'>
            <RecentDonations donations={donations} />
            <div className='col-8'>
              <ProgressBar raisedAmount={raisedAmount} targetAmount={targetAmount}
              />
              <hr />
              <Form
                formDonor={formDonor}
                formCaption={formCaption}
                formAmount={formAmount}
                handleSubmit={this.handleSubmit}
                handleFormInput={this.handleFormInput}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
