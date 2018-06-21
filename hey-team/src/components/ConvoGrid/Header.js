import React from 'react';
import { connect } from 'react-redux';

class Billing extends React.Component {
  
  render() {
    return (
      <div>
        <StripeProvider apiKey="pk_test_8UHcn9VUzIRm8MGqifwA82kD">
          <row>
            <Store />
          </row>
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