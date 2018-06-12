import React from 'react';
import { connect } from 'react-redux';
//import { addConvo } from '../actions';

// import Loading from './Loading';

class Signin extends React.Component {
    state = {
    }
    
    render() {
      return (
          <div>Sign in form goes here</div>
      );
    }
  }
  
const mapStateToProps = (state) => {
    return {
    } 
}

export default connect(mapStateToProps, {  })(Signin);