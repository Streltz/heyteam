import React from 'react';
import { connect } from 'react-redux';
import { signOut } from '../actions/userAction';

import './Header.css'

class Header extends React.Component {
  state = {}

  handleSignOut = () => {
    console.log('prop history', this.props);
    this.props.signOut(this.props.history)
  }

  render() {
    return (
      <div>
        <div className="headContain">
          <div className="logo-wrapper text-left">
            <div className="logo-large white headbar-logo">
              Hey-Bot
            </div>
            <div className="slack-logo">
            </div>
          </div>
          <div id="signout-container">
            <span className="signOut" onClick={() => { this.handleSignOut() }}>Sign Out</span>          
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