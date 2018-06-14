import React from 'react';
import { connect } from 'react-redux';

class Preferences extends React.Component {
  
  render() {
    return (
      <div>
        Preferences goes here
      </div>
    );
  }
}
  
const mapStateToProps = (state) => {
    return {
    } 
}

export default connect(mapStateToProps, {  })(Preferences);