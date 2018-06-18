import React from 'react';
import { connect } from 'react-redux';
import { signOut } from '../actions/userAction';

import './Header.css'

class Header extends React.Component {
  state = { }

  handleSignOut = () => {
    console.log('prop history', this.props);
    this.props.signOut(this.props.history)
  }
  
  render() {
    return (
      <div>
 
    
      <div className="headContain">
        <div className="slack-logo-wrapper">
          <div className="slacklogo">
          </div>
          </div>
          <div className="heyTeam">
        <font familty="Courier Header">Hey Team!</font>
        <div className="signOut">
        <button>
        <div onClick={() => {this.handleSignOut()}}><u>Sign Out</u></div>
        </button>
      </div>
    </div>
    </div>
    </div>
    );
  }
}
  
const mapStateToProps = (state) => {
    return {
    } 
}



export default connect(mapStateToProps, { signOut })(Header);