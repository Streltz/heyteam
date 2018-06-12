import React from 'react';
import { connect } from 'react-redux';
//import { addConvo } from '../actions';

// import Loading from './Loading';

class Signup extends React.Component {
    state = {
    }
    
    render() {
      return (
          <div>Signup form goes here</div>
      );
    }
  }
  
const mapStateToProps = (state) => {
    return {
    } 
}

export default connect(mapStateToProps, {  })(Signup);