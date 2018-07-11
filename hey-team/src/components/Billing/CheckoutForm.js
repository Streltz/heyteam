import React from 'react';
import axios from 'axios';
import {injectStripe, CardElement, CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement,
PaymentRequestButtonElement, IbanElement, IdealBankElement} from 'react-stripe-elements';

import { Card } from 'reactstrap';

import './styles.css';

const ROOT_URL = 'http://localhost:5000' || 'https://mysterious-coast-15187.herokuapp.com';

const createOptions = (fontSize, padding) => {
  return {
    style: {
      base: {
        fontSize: '18px',
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4',
        },
        padding,
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };
};

class CheckoutForm extends React.Component {
  state = {
    name: '',
    complete: false,
    summary: null,
    amount: 0.50,
    error:''
  }


  handlePayment = (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();
    if (this.state.amount === 0) {
      this.setState({error: "Amount must be greater than $0.00"})
    }
    if (!this.state.name) {
      this.setState({error: "Must provide a name"})
    }
    if (this.state.name && this.state.amount > 0) {
    this.props.stripe.createToken({name: this.state.name}).then(result=>{
        axios.post(`${ROOT_URL}/billing`, {token: result.token.id, amount: this.state.amount}).then(res=>{
          if(res.data.status === 'succeeded'){
            this.setState({complete: true, summary: res.data });
          }
        });
      }).catch(err => console.log('catch err: ', err));
    }
  };

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleAmountChange = (ev) => {
    console.log(typeof (ev.target.value) === 'number')
    if (Number(ev.target.value != NaN)) {
      this.setState({
        [ev.target.name]: ev.target.value
      })
    } else {
      this.setState({
        [ev.target.name]: ''
      })
    }
  }

  render() {
    if (this.state.complete) return (<div>
      <h1>Purchase Complete</h1>
      <div>{this.state.summary.source.name} with card ending {this.state.summary.source.last4} will be charged {this.state.amount} {this.state.summary.currency}</div>
      </div>);
    return (
      <main className="main-billing">
        <Card className="edge-card">
          <div className="card-dashboard">
            <div className="billing-title text-left col-md-12">Billing</div>
            <br /><br />
            <div className="name-input">
             <input type="text" name="name" value={this.state.name}
                placeholder="Name" onChange={this.handleOnChange} /><br />
            </div>

            {/* <label>
          Card number
          <CardNumberElement
            className = 'StripeCardNumber'
            {...createOptions()}
          />
        </label><br />
        <label>
          Expiration date
          <CardExpiryElement
            {...createOptions()}
          />
        </label><br />
        <label>
          CVC
          <CardCVCElement
            {...createOptions()}
          />
        </label><br />
        <label>
          Postal code
          <PostalCodeElement
            {...createOptions()}
          />
        </label> */}

            <CardElement className='stripe-cardElement' style={ 
              {base: {
                color: '#32325d',
                fontSize: '20px',
                lineHeight: '25px',
                } }}/>

            <div className="amount-input col-md-12">
              <span className="heading col-md-4"> Amount: $ </span>
              <input className="col-md-8"type="number" min='0.5' name="amount" value={this.state.amount}
              placeholder="0.00" onChange={this.handleAmountChange} />
              <br />
            </div>

            <div className="form-error text-center card-descriptor col-md-12">
              {this.state.error != '' ? this.state.error : null}
            </div>
                    
            <button className="light-blue-btn col-md-10 submit-btn" onClick={this.handlePayment}>
                Submit
            </button>
          </div>
        </Card>
      </main>
    );
  }
}

export default injectStripe(CheckoutForm);