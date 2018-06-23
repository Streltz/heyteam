import React from 'react';
import { connect } from 'react-redux';
import { sortConvos } from '../../actions/convoAction';

class ConvoHeader extends React.Component {
  state = {
    active: 'All',
    tabs: ['All', 'Newest', 'Oldest', 'Responded', 'Not Responded']
  }

  handleClickTab = (tab) => {
    this.setState({
      active: tab
    });
  }

  handleSorting = (tab)=>{
    this.props.sortConvos(tab);
  }
  
  render() {
    return (
      <div className="convo-header">
        {
          this.state.tabs.map(tab=>{
            return <div key={tab} className={this.state.active === tab ? "sort active" : "sort"} onClick={()=>{this.handleClickTab(tab)}}>{tab}</div>
          })
        }
      </div>
    );
  }
}
  
const mapStateToProps = (state) => {
    return {
    } 
}

export default connect(mapStateToProps, { sortConvos })(ConvoHeader);