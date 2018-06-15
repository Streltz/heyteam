import React from 'react';
import {injectStripe, CardElement, CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement,
PaymentRequestButtonElement, IbanElement, IdealBankElement} from 'react-stripe-elements';

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
        <div className="formBox col-md-12">
            <CardElement className='stripeInput' style={ {base: {fontSize: '1.0rem' } }}/>
            <button className="stripeButton" onClick={this.handleSubmit}>
                Submit
            </button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);