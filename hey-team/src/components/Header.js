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
            <div class="Logo-1 headbar-logo">
              Hey-Bot
            </div>
            <div className="slack-logo">
            </div>
          </div>
          <div class="signOut" onClick={() => { this.handleSignOut() }}><u>Sign Out</u></div>          
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