import React from 'react';
import {injectStripe, CardElement, CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement,
PaymentRequestButtonElement, IbanElement, IdealBankElement} from 'react-stripe-elements';

import { Card } from 'reactstrap';

import './styles.css';

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
  }

  handlePayment = (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    this.props.stripe.createToken({name: 'Jenny Rosen'}).then(({token}) => {
      console.log('Received Stripe token:', token);
    });

  };

  render() {
    return (
      <main className="main-billing">
        <Card className="edge-card">
          <div className="card-dashboard">
            <div class="logo text-left col-md-12">Billing</div>
            <br /><br />

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
                '::placeholder': {
                  color: '#aab7c4'
                },
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