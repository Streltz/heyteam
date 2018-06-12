import React from 'react';
import { connect } from 'react-redux';
//import { addConvo } from '../actions';

// import Loading from './Loading';

class SideBar extends React.Component {
    state = {
    }
    
    render() {
      return (
          <div>SideBar</div>
      );
    }
  }
  
const mapStateToProps = (state) => {
    return {
    } 
}

export default connect(mapStateToProps, {  })(SideBar);