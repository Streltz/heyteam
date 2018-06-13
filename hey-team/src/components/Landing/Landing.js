import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//import { addConvo } from '../actions';

// import Loading from './Loading';
import Carousel from './carousel';

import './styles.css'

class Landing extends React.Component {
    state = {
    }
  
    render() {
      return (
        <main>
          <style>
            @import url('https://fonts.googleapis.com/css?family=Lato:700');
          </style>

          <header>
            <div class="col-md-12">            
              <div class="Logo col-md-3">
                Hey-Bot
              </div>
              <div class="nav-link-group col-md-9">
                <Link to="/signup">Sign Up   </Link>
                <Link to="/signin">   Sign In</Link>
              </div>
            </div>                         
          </header>

          <section>
            <div class="col-md-12">
              <div class="col-md-6" id="description-section">
                <div class="col-md-12 header-text">Conversation Manager within Slack</div>
                <div class="col-md-12 desc-text">Build and manage private conversations</div>
              <button id="buy-now" class="btn-blue col-md-6">
                <Link to="/billing">Buy Now</Link>
              </button>              
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

export default connect(mapStateToProps, {  })(Landing);