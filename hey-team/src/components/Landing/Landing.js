import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//import { addConvo } from '../actions';

// import Loading from './Loading';

import './landing.css'

class Landing extends React.Component {
  state = {
  }

  render() {
    return (
      <main id="landing-main">
        <header id="nav-header">
          <div className="col-md-12">
            <div className="logo-large white float-left col-md-3">
              Hey-Bot
              </div>
            <div className="nav-link-group col-md-9">
              <Link to="/signup">Sign Up</Link>
              <Link className="right-label" to="/signin">Sign In</Link>
            </div>
          </div>
        </header>

        <header id="banner" className="banner-section">
          <div className="col-md-12">
            <div className="col-md-6" id="description-section">
              <div className="col-md-12 header-text">Slack Conversation Manager</div>
              <div className="col-md-12 desc-text">Build and manage private conversations</div>
              <button id="buy-now" className="btn-blue col-md-10">
                <Link to="/billing">Buy Now</Link>
              </button>
            </div>
          </div>
          <div className="col-md-12">
          </div>
        </header>

        <section className="section-body">
        {
          // Content Goes in here!
        }
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps, {})(Landing);