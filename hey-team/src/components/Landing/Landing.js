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
              <div className="col-md-12 desc-text">
                Hey-Bot is the best platform to build and manage private Slack conversations.
              </div>
              <div className="btn-group">
                <button className="btn-green btn-original">
                  <Link to="/signup">Donate</Link>
                </button>
                <button className="btn-white btn-original">
                  <Link to="/signup">Create Account</Link>
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-12">
          </div>
        </header>
        <div id="robot-image">
          <div className="animate-img">
          </div>
        </div>
        <section id="section-create" className="section-content text-right">
          <div className="section-heading">
            Create
          </div>
          <div className="section-body">
            Create separate and private conversations with the members of your team simultaneously
            Well organized conversations complete with timestamps and titles
          </div>
        </section>

        <section id="section-product" className="section-content">
          <div className="section-heading">
            Product
          </div>
          <div className="section-body">
            Questions can be sent immediately or scheduled for a future time and date. Hey Team's new question card comes with a full
            list of options such as Time and Date, Participants and whether they want have the conversation privately through
            Slack's Direct Messaging feature or in a separate Hey Bot Slack channel.
            Our Conversations feature will organize all your questions and show Managers who has responded, how they responded and when they responded.
            Hey Bot also offers the option of having these organized messages sent to the Manager's e-mail as well for safe record keeping.
          </div>
          <div>
            {
              // Video goes here.
            }
          </div>
        </section>

        <section id="section-team" className="section-content">
          <div className="section-heading inverse-white">
            Our Team
          </div>
          <div className="section-body">
            <div className="card-container">
              <div class="card team-mem">
                <div className="mike-img circle-img"></div>
                <div className="container">
                  <h2 className="sized-head">Mike Streltsoff</h2>
                  <p className="title">Full-Stack</p>
                  <i class="fab fa-github"></i>
                </div>
              </div>
              <div className="card team-mem">
                <div className="david-img circle-img"></div>
                <div className="container">
                  <h2>David Soudry</h2>
                  <p className="title">Full-Stack</p>
                  <i class="fab fa-github"></i>
                </div>
              </div>
              <div className="card team-mem">
                <div className="lo-img circle-img"></div>
                <div className="container">
                  <h2>Lo Saephan</h2>
                  <p className="title">Full-Stack</p>
                  <i class="fab fa-github"></i>
                </div>
              </div>
              <div className="card team-mem">
                <div className="eileen-img circle-img"></div>
                <div className="container">
                  <h2>Eileen Eddy</h2>
                  <p className="title">Full-Stack</p>
                  <i class="fab fa-github"></i>
                </div>
              </div>
              <div className="card team-mem">
                <div className="guy-img circle-img"></div>
                <div className="container">
                  <h2>Guy Ross</h2>
                  <p className="title">Full-Stack</p>
                  <i class="fab fa-github"></i>
                </div>
              </div>
            </div>
          </div>
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