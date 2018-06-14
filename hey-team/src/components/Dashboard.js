import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import SideBar from './SideBar';
import ConvoGrid from '../components/ConvoGrid/ConvoGrid';

class Dashboard extends React.Component {
    state = {
    }
  
    
    render() {
      return (<div>
        <SideBar />
        <Header history={this.props.history}/>
        <ConvoGrid />
      </div>) 
    }
  }
  
const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, {  })(Dashboard);