import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import SideBar from './SideBar';
import ConvoGrid from './ConvoGrid';

class Dashboard extends React.Component {
    state = {
    }
  
    
    render() {
      return (<div>
        <SideBar />
        <Header />
        <ConvoGrid />
      </div>) 
    }
  }
  
const mapStateToProps = (state) => {

}

export default connect(mapStateToProps, {  })(Dashboard);