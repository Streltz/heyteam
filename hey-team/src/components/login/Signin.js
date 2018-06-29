import React from 'react';
import { connect } from 'react-redux';
import { signIn, clearFormError } from '../../actions/userAction';
import { Link } from 'react-router-dom';
import { Card } from 'reactstrap';

// import './styles.css';

class Signin extends React.Component {
  state = {
    email: '',
    password: ''
  }

  componentWillMount() {
    this.props.clearFormError();
  }

  handleSignIn = (event) => {
    if (event != undefined) {
      event.preventDefault();
      this.props.signIn(this.state, this.props.history);
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
            <form id="signin-form" onSubmit={(e) => { this.handleSignIn(e) }}>
              <div className="logo black-dark text-left col-md-12">Hey-Bot</div>
              <div className="text-left col-md-12 heading"> Sign In </div>
              <div className="text-left card-descriptor col-md-12">with your Hey-Bot Account</div>
              <br />
              <div className="form-error text-left card-descriptor col-md-12">{this.props.user.formError}</div>
              <input className="col-md-10 form-control" name="email" value={this.state.email}
                placeholder="Email" onChange={this.handleOnChange} /><br />

              <input className="col-md-10 form-control" name="password" type="password" value={this.state.value}
                placeholder="Password" onChange={this.handleOnChange} /><br />
              <br />
              <div className="col-md-12">
                <span className="col-md-6 float-right">
                  <button className="signin light-blue-btn" onClick={() => { this.handleSignIn() }}>
                    Sign in
                  </button>
                  <br />
                </span>
                <span id="create-account" className="col-md-6 float-left">
                  <Link to="/signup" className="blue-link spaced">
                    Create account
                  </Link>
                </span>
              </div>
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
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { signIn, clearFormError })(Signin);