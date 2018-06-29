import React from 'react';
import { connect } from 'react-redux';
import { signUp, clearFormError } from '../../actions/userAction';
import { Link } from 'react-router-dom';
import { Card } from 'reactstrap';

import './styles.css';

class SignUp extends React.Component {
  state = {
    name: '',
    email: '',
    password: ''
  }

  componentWillMount() {
    this.props.clearFormError();
  }

  handleSignUp = (event) => {
    if (event != undefined) {
      event.preventDefault();
      this.props.signUp(this.state, this.props.history);
    }
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <main id="main-login">
        <Card className="edge-dull">
          <div className="login card-dull">
            <form id="signin-form" onSubmit={(e) => { this.handleSignUp(e) }}>
              <div className="logo black-dark text-left col-md-12">Hey-Bot</div>
              <div className="text-left col-md-12 heading"> Sign Up </div>
              <div className="text-left card-descriptor col-md-12">for a new Hey-Bot Account</div>
              <br />
              <input className="col-md-10 form-control" type="text" name="name" value={this.state.name}
                placeholder="Username" onChange={this.handleOnChange} /><br />

              <input className="col-md-10 form-control" type="text" name="email" value={this.state.email}
                placeholder="Email" onChange={this.handleOnChange} /><br />

              <input className="col-md-10 form-control" type="password" name="password" value={this.state.password}
                placeholder="Password" onChange={this.handleOnChange} /><br />

              <div className="col-md-12">
                <span className="col-md-6 float-right">
                  <button className="sigin light-blue-btn" onClick={() => { this.handleSignUp() }}>Submit</button><br />
                </span>
              </div>
              <span id="create-account" className="col-md-6 float-left">
                <Link to="/signin" className="blue-link">
                  Sign-In
              </Link>
              </span>
            </form>
          </div>
        </Card>
        <div id="return-btn" className="white col-md-5 float-right">
          <Link to="/">
            Return Home
          </Link>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state user: ', state.user);
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { signUp, clearFormError })(SignUp);