import React from 'react';
import { connect } from 'react-redux';
import { signIn, clearFormError } from '../../actions/userAction';
import { Link } from 'react-router-dom';
import { Card} from 'reactstrap';

import './styles.css';

class Signin extends React.Component {
  state = {
    email: '',
    password: ''
  }

  componentWillMount(){
    this.props.clearFormError();
  }

  handleSignIn = () => {
    console.log('sigin prpos', this.props);
    this.props.signIn(this.state, this.props.history);
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
            <div class="logo text-left col-md-12">Hey-Bot</div>
            <div class="text-left col-md-12 heading"> Sign In </div>
            <div class="text-left card-descriptor col-md-12">with your Hey-Bot Account</div>
            <br />
            <div className="form-error">{this.props.user.formError}</div>
            <input class="col-md-10 form-control" name="email" value={this.state.email}
              placeholder="Email" onChange={this.handleOnChange} /><br />
            
            <input class="col-md-10 form-control" name="password" type="password" value={this.state.value}
              placeholder="Password" onChange={this.handleOnChange} /><br />

            <div class="col-md-12">
              <button class="signin light-blue-btn" onClick={() => { this.handleSignIn() }}>Sign in</button><br />
            </div>

            <Link to="/signup" class="blue-link">Don't have an account?</Link>
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

export default connect(mapStateToProps, { signIn, clearFormError })(Signin);