import React from 'react';
import { connect } from 'react-redux';

class Billing extends React.Component {
  
  render() {
    return (
      <div>
        Billing form goes here
      </div>
    );
  }
}
  
const mapStateToProps = (state) => {
    return {
    } 
}

export default connect(mapStateToProps, {  })(Billing);