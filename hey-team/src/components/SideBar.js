import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//import { addConvo } from '../actions';
import './SideBar.css'

// import Loading from './Loading';

class SideBar extends React.Component {
    state = {
    }
    
    render() {
      return (
          <div className="LeftColumnPanel">
					<Link to="/dashboard">
					  <div className="view-button button">Conversations</div>
					</Link>
					<Link to="/dashboard/preferences">
					  <div className="preferences-button button">Preferences</div>
					</Link>	
					<Link to="/dashboard/billing">
					  <div className="billing-button button">Billing</div>
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
