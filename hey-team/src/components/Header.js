import React from 'react';
import { connect } from 'react-redux';
import { signOut } from '../actions/userAction';

class Header extends React.Component {
  state = { }

  handleSignOut = () => {
    console.log('prop history', this.props);
    this.props.signOut(this.props.history)
  }
  
  render() {
    return (
      <div>
        <div>Breadcrumb</div>
        <div onClick={() => {this.handleSignOut()}}><u>Sign Out</u></div>
      </div>
    );
  }
}
  
const mapStateToProps = (state) => {
    return {
    } 
}

export default connect(mapStateToProps, { signOut })(Header);