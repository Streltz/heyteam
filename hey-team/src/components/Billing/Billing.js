import React from 'react';
import { connect } from 'react-redux';
import {StripeProvider} from 'react-stripe-elements';

import Store from './Store';

class Billing extends React.Component {
  
  render() {
    return (
      <div>
        Billing Page
        <StripeProvider apiKey="pk_test_8UHcn9VUzIRm8MGqifwA82kD">

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