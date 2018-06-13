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
					<p>
					<Link to="/viewconvo">
					  <div className="view-button button"> Conversation</div>
					</Link>
					<Link to="/preferences">
					  <dic className="preferences-button button">+Preferences</div>
					<Link to="/billing">
					  <div className="billing-button button">+ Billing</div>
					<Link>
						
      );
    }
  }
  
const mapStateToProps = (state) => {
    return {
    } 
}

export default connect(mapStateToProps, {  })(SideBar);
