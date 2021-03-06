import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import SideBar from './Sidebar/SideBar';
import ConvoGrid from '../components/ConvoGrid/ConvoGrid';
import { Switch, Route } from 'react-router-dom';
import Billing from './Billing/Billing';
import Preferences from './Preferences/Preferences';
import ViewConvo from './ConvoDetail/ViewConvo';
import EditConvo from './EditConvo';
import AddConvo from './AddConvo/AddConvo';

import './Dashboard.css';

class Dashboard extends React.Component {    
    
    render() {
      return (<div>        
        <Header history={this.props.history}/>
        <div className="FullPage">
        <div className="Sidebar">
          <SideBar />
        </div>
        <div className="Content">
        <Switch>
          <Route path ="/dashboard" component = {ConvoGrid} exact />
          <Route path ="/dashboard/billing" component = {Billing} />
          <Route path ="/dashboard/preferences" component = {Preferences} />
          <Route path ="/dashboard/add" component = {AddConvo} />
          <Route path ="/dashboard/edit/:id" component = {EditConvo} />
          <Route path ="/dashboard/:id" component = {ViewConvo} />
        </Switch>
        </div>
        </div>
      </div>) 
    }
  }
  
const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, {  })(Dashboard);

// <Switch>
//         <Route path ="/dashboard" component = {ConvoGrid} />
//         {/* <Route path ="/dashboard/viewconvo/:id" component = {ViewConvo} />
//         <Route path ="/dashboard/editconvo/:id" component = {EditConvo} /> */}
//         {/* <Route path ="/dashboard/preferences" component = {Preferences} /> */}
//         <Route path ="/dashboard/billing" component = {Billing} />
//         </Switch>