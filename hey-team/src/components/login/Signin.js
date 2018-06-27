import React from 'react';
import { connect } from 'react-redux';
import { signIn, clearFormError } from '../../actions/userAction';
import { Link } from 'react-router-dom';
import { Card } from 'reactstrap';

import Loading from '../Loading';

import './styles.css';


// function ButtonClicked()
// {
//    document.getElementById("col-md-6 float-right").style.display = "none"; // to undisplay
//    document.getElementById("buttonreplacement").style.display = ""; // to display
//    return true;
// }
// var FirstLoading = true;
// function RestoreSubmitButton()
// {
//    if( FirstLoading )
//    {
//       FirstLoading = false;
//       return;
//    }
//    document.getElementById("col-md-6 float-right").style.display = ""; // to display
//    document.getElementById("Loading").style.display = "none"; // to undisplay
// }
// // To disable restoring submit button, disable or delete next line.
// document.onfocus = RestoreSubmitButton;



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
      console.log("ev", event);
    }
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
            <form id="signin-form" onSubmit={(e) => { this.handleSignIn(e) }}>
              <div class="logo-blue text-left col-md-12">Hey-Bot</div>
              <div class="text-left col-md-12 heading"> Sign In </div>
              <div class="text-left card-descriptor col-md-12">with your Hey-Bot Account</div>
              <div className="form-error">{this.props.user.formError}</div>
              <input className="col-md-10 form-control" name="email" value={this.state.email}
                placeholder="Email" onChange={this.handleOnChange} /><br />

              <input className="col-md-10 form-control" name="password" type="password" value={this.state.value}
                placeholder="Password" onChange={this.handleOnChange} /><br />
              <br />
              <div className="col-md-12">
                <span className="col-md-6 float-right">
                {this.props.loading ? <Loading /> : <button className="signin light-blue-btn" onClick={() => { this.handleSignIn() }}>
                    Sign in
                  </button>}
                    </span>
                  <br />
                <span id="create-account" className="col-md-6 float-left">
                  <Link to="/signup" className="blue-link spaced">
                    Create account
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </Card>
      </main>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    loading: state.user.loading,
  };
}

export default connect(mapStateToProps, { signIn, clearFormError })(Signin);