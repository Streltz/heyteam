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
import Billing from './components/Billing';
import RequireAuth from './components/HOC/RequireAuth';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
        <div className="left-panel">
          <Route path ="/" component = {Landing} exact />
          <Route path ="/dashboard" component = {RequireAuth(Dashboard)} />
          {/*<Route path ="/addconvo" component = {AddConvo} />*/}
          
          <Route path ="/editconvo/:id" component = {EditConvo} />
          <Route path ="/signin" component = {Signin} />
          <Route path ="/signup" component = {Signup} />
          <Route path ="/billing" component = {Billing} />
          {/* <Route path ="/preferences" component = {Preferences} /> */}
          {/* <Route path ="/billing" component = {Billing} /> */}
        </div>
        </Router>
      </div>
    );
  }
}

export default App;
