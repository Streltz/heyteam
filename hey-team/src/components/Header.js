import React from 'react';
import { connect } from 'react-redux';
//import { addConvo } from '../actions';

// import Loading from './Loading';

class Header extends React.Component {
    state = {
    }
  
    render() {
      return (
          <div>Header</div>
      );
    }
  }
  
const mapStateToProps = (state) => {
    return {
    } 
}

export default connect(mapStateToProps, {  })(Header);