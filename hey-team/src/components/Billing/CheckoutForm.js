import React from 'react';
import {injectStripe, CardElement, CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement,
PaymentRequestButtonElement, IbanElement, IdealBankElement} from 'react-stripe-elements';

import { Card} from 'reactstrap';


import './styles.css';

class CheckoutForm extends React.Component {
  handleSubmit = (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    this.props.stripe.createToken({name: 'Jenny Rosen'}).then(({token}) => {
      console.log('Received Stripe token:', token);
    });

  };

  render() {
    return (

      <main className="main-billing">
        <Card className="edge-dashboard">
          <div className="login card-dashboard">
            <div class="logo text-left col-md-12">Billing</div>
            <br /><br />

            <CardElement className='stripe-cardElement' style={ {base: {fontSize: '1.2em' } }}/>
                        
            <button className="light-blue-btn col-md-10 submit-btn" onClick={this.handleSubmit}>
                Submit
            </button>
          </div>
        </Card>
      </main>
    );
  }
}

export default injectStripe(CheckoutForm);