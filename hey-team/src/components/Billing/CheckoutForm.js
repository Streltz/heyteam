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
    summary: null
  }

  handlePayment = (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();
    this.props.stripe.createToken({name: this.state.name}).then(result=>{
      axios.post(`${ROOT_URL}/billing`, {token: result.token.id}).then(res=>{
        if(res.data.status === 'succeeded'){
          this.setState({complete: true, summary: res.data });
        }
      });
    });
  };

    handleOnChange = (event) => {
    this.setState({
      name: event.target.value
    });
  }

  render() {
    if (this.state.complete) return (<div>
      <h1>Purchase Complete</h1>
      <div>{this.state.summary.source.name} with card ending {this.state.summary.source.last4} will be charged {this.state.summary.amount} {this.state.summary.currency}</div>
      </div>);
    return (
      <main className="main-billing">
        <Card className="edge-card">
          <div className="card-dashboard">
            <div className="billing-title">Billing</div>
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