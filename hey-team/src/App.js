import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import ConvoGrid from './components/ConvoGrid';
import AddConvo from './components/CreateConvo';
import EditConvo from './components/EditConvo';
import ViewConvo from './components/ViewConvo'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
        <div className="left-panel">
          <Route path ="/" component = {ConvoGrid} exact />
          <Route path ="/addconvo" component = {AddConvo} />
          <Route path ="/viewconvo/:id" component = {ViewConvo} />
          <Route path ="/editconvo/:id" component = {EditConvo} />
          {/* <Route path ="/preferences" component = {Preferences} /> */}
          {/* <Route path ="/billing" component = {Billing} /> */}
        </div>
        </Router>
      </div>
    );
  }
}

export default App;
