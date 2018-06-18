import React from 'react';
import { connect } from 'react-redux';
import './preferences.css';

class Preferences extends React.Component {

  state = {
    selectedOption: 'On'
  }

  handleOptionChange = (event)=>{
    this.setState({
      selectedOption: event.target.value
    });
    //TODO: hook up with action and change preferences
  }
  
  render() {
    return (
      <div className="preferences">
        <h3 className="title">Preferences</h3>
        <div classname="email">Email Summary</div>
        <form>
        <div className="radio">
          <label>
            <input type="radio" onChange={this.handleOptionChange} value="On" checked={this.state.selectedOption === 'On'} />
            On
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" onChange={this.handleOptionChange} value="Off" checked={this.state.selectedOption === 'Off'} />
            Off
          </label>
        </div>
      </form>
      </div>
    );
  }
}
  
const mapStateToProps = (state) => {
    return {
    } 
}

export default connect(mapStateToProps, {  })(Preferences);