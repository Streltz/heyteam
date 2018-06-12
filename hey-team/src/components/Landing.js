import React from 'react';
import { connect } from 'react-redux';
//import { addConvo } from '../actions';

// import Loading from './Loading';

class Landing extends React.Component {
    state = {
    }
  
    render() {
      return (
        <div>
          <div><span>Sign Up</span><span>Sign In</span></div>
          <div>CAROUSEL</div>
          <div>App Descriptions</div>
          <div>BUY NOW</div>
        </div>
      );
    }
  }
  
const mapStateToProps = (state) => {
    return {
    } 
}

export default connect(mapStateToProps, {  })(Landing);