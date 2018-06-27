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
            <i className="material-icons">supervisor_account</i>
            <span className="tab-label">
              Conversations
            </span>
          </div>
        </Link>

        <Link to="/dashboard/preferences">
          <div className="sidebar-content">
            <i className="material-icons">settings</i>
            <span className="tab-label">
               Preferences
            </span>
          </div>
        </Link>

        <Link to="/dashboard/billing">
          <div className="sidebar-content">
            <i className="fa fa-cc-stripe"></i>
            <span className="tab-label">
              Billing
            </span>
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

export default connect(mapStateToProps, {})(SideBar);
