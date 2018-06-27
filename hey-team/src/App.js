import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import AddConvo from './components/CreateConvo';
import EditConvo from './components/EditConvo';
import ViewConvo from './components/ConvoDetail/ViewConvo';
import Dashboard from './components/Dashboard';
import Landing from './components/Landing/Landing';
import Signin from './components/login/Signin';
import Signup from './components/login/Signup';
import Billing from './components/Billing/Billing';
import RequireAuth from './components/HOC/RequireAuth';
import { newResponse } from './actions/convoAction';
import { connect } from 'react-redux';
// dumb comment so I can do a PR

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5000');

socket.on('connect', (data)=>{
  console.log('connect', data);
});

class App extends Component {

  componentDidMount(){
    socket.on('new response', (convo)=>{
      console.log('sock new res', convo);
      this.props.newResponse(convo);
    });
  }

  render() {
    return (
      <div className="App">
        <Router>
        <div className="left-panel">
          <Route path ="/" component = {Landing} exact />
          <Route path ="/dashboard" component = {RequireAuth(Dashboard)} />
          <Route path ="/editconvo/:id" component = {EditConvo} />
          <Route path ="/signin" component = {Signin} />
          <Route path ="/signup" component = {Signup} />
        </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps, { newResponse })(App);
