import React from 'react';
import { connect } from 'react-redux';
import {StripeProvider, Elements} from 'react-stripe-elements';
import Store from './Store';
import CheckoutForm from './CheckoutForm';
class Billing extends React.Component {
  
  render() {
    return (
      <div>
        <StripeProvider apiKey="pk_test_LwL4RUtinpP3PXzYirX2jNfR">
          {/* <row>
            <Store />
          </row> */}
          <Elements>
            <CheckoutForm />
          </Elements>
        </StripeProvider>
      </div>
    );
  }
}
  
const mapStateToProps = (state) => {
    return {
    } 
}

export default connect(mapStateToProps, {  })(Billing);