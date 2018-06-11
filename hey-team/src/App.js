import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
        <div className="left-panel">
          <Route path ="/" component = {ViewConvos} exact />
          <Route path ="/createconvo" component = {CreateConvo} />
          <Route path ="/viewsingleconvo/:id" component = {ViewConvo} />
          <Route path ="/editconvo/:id" component = {EditConvo} />
          <Route path ="/preferences" component = {Preferences} />
          <Route path ="/billing" component = {Billing} />
        </div>
        </Router>
      </div>
    );
  }
}

export default App;
