import React from 'react';
import { connect } from 'react-redux';
import { signUp} from '../../actions/userAction';
import { Link } from 'react-router-dom';
import { Card} from 'reactstrap';

import './styles.css';

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
      <main className="main-login">
        <Card className="edge-dull">
          <div className="login card-dull">
            <div className="logo text-left col-md-12">Hey-Bot</div>
            <div className="text-left col-md-12 heading"> Sign Up </div>
            <div className="text-left card-descriptor col-md-12">for a new Hey-Bot Account</div>
            <br />

            <input className="col-md-10 form-control" type="text" name="name" value={this.state.name} 
            placeholder="Username" onChange={this.handleOnChange}/><br />

            <input className="col-md-10 form-control" type="text" name="email" value={this.state.email} 
            placeholder="Email" onChange={this.handleOnChange}/><br />

            <input className="col-md-10 form-control" type="password" name="password" value={this.state.password} 
            placeholder="Password" onChange={this.handleOnChange}/><br />

            <div className="col-md-12">
              <button className="sigin light-blue-btn" onClick={() => {this.handleSignUp()}}>Submit</button><br />
            </div>

            <Link to="/signin" className="blue-link">Already have an account?<br /></Link>
          </div>
        </Card>
      </main>      
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  } 
}

export default connect(mapStateToProps, {signUp})(SignUp);