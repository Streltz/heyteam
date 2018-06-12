import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//import { addConvo } from '../actions';

// import Loading from './Loading';

class Landing extends React.Component {
    state = {
    }
  
    render() {
      return (
        <div>
          <div>
            <Link to="/signup">Sign Up</Link>
            <Link to="/signin">Sign In</Link>
          </div>

          <div>CAROUSEL</div>
          <div>App Descriptions</div>
          <Link to="/billing">BUY NOW</Link>
        </div>
      );
    }
  }
  
const mapStateToProps = (state) => {
    return {
    } 
}

export default connect(mapStateToProps, {  })(Landing);