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
        <div className="LeftColumnPanel text-left">
					<Link to="/dashboard">
					  <div className="sidebar-content">
              <i className="material-icons">supervisor_account</i> Conversations 
             </div>
					</Link>

					<Link to="/dashboard/preferences">
            <div className="sidebar-content"> 
              <i className="material-icons">settings</i> Preferences 
            </div>
					</Link>	
					
          <Link to="/dashboard/billing">
            <div className="sidebar-content">
              <i className="fa fa-cc-stripe"></i> Billing
            </div>
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
