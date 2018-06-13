import React from 'react';
import { connect } from 'react-redux';
import { signUp} from '../actions/userAction';
import { Link } from 'react-router-dom';

class SignUp extends React.Component {
  state = {
    name: '',
    email: '',
    password: ''
  }
  handleSignUp = () => {
      this.props.signUp(this.state, this.props.history); 
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  
  render() {
    return (
      <div className="signup">
        <div className="title">HeyTeam Sign Up</div>
        <input type="text" name="name" value={this.state.name} 
        placeholder="Username" onChange={this.handleOnChange}/><br />

        <input type="text" name="email" value={this.state.email} 
        placeholder="Email" onChange={this.handleOnChange}/><br />

        <input type="password" name="password" value={this.state.password} 
        placeholder="Password" onChange={this.handleOnChange}/><br />

        <button onClick={() => {this.handleSignUp()}}>Sign up</button><br />
        <div>Already have an account?</div>
        <Link to="/signin"><button className="signin">Sign in</button><br /></Link>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  } 
}

export default connect(mapStateToProps, {signUp})(SignUp);