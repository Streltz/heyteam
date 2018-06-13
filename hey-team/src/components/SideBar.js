import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//import { addConvo } from '../actions';

// import Loading from './Loading';

class SideBar extends React.Component {
    state = {
    }
    
    render() {
      return (
          <div SideBar>
					<Link to="/viewconvo">
					  <div className="view-button button"> Conversation</div>
					</Link>
					<Link to="/preferences">
					  <div className="preferences-button button">+Preferences</div>
					</Link>	
					<Link to="/billing">
					  <div className="billing-button button">+ Billing</div>
					</Link>
					</div>		
      );
    }
  }
  
const mapStateToProps = (state) => {
    return {
    } 
}

export default connect(mapStateToProps, {  })(SideBar);
