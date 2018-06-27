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
      <main className="landing-main">
        <header id="nav-header">
          <div className="col-md-12">
            <div className="Logo-1 col-md-3">
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
              <div className="col-md-12 header-text">Conversation Manager within Slack</div>
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
        
          <p>
            Say Hello to Hey Team! A SlackBot for all your team's needs. Finally, Project Manager's can send out polls or questions to a team and 
            receive their responses in an organized and private way.
          </p> 
          <p>
          How it Works:
          </p>
          <p>
          Project Managers can create, separate and private conversations with the members of their team simultaneously.
          New Conversations are well organized complete with timestamps and titles. 
          </p>
          <p>
          Questions can be sent immediately or scheduled for a future time and date. Hey Team's new question card comes with a full 
          list of options such as Time and Date, Participants and whether they want have the conversation privately through 
          Slack's Direct Messaging feature or in a separate Hey Bot Slack channel.
          </p>
          <p>
          Our Conversations feature will organize all your questions and show Managers who has responded, how they responded and when they responded. 
          Hey Bot also offers the option of having these organized messages sent to the Manager's e-mail as well for safe record keeping.
          </p>
          
        
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