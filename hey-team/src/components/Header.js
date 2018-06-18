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
          <img className="slacklogo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDQvf1ORt2PMY4S_V1AoFs57ekWOJKkkppVgs7Je8ZLLC6FBlWSQ"/>
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