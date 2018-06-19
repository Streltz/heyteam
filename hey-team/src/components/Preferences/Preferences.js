import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'reactstrap';

import './preferences.css';

class Preferences extends React.Component {

  state = {
    selectedOption: 'On'
  }

  handleOptionChange = (event) => {
    this.setState({
      selectedOption: event.target.value
    });
    //TODO: hook up with action and change preferences
  }

  render() {
    return (
      <main id="main-preferences">
        <Card className="edge-card text-left col-md-12">
          <div id="card-pref">
            <div className="logo">Preferences</div>
            <br /><br />
            <div classname="sub-header">Email Summary</div>
            <form class="form-group">
              <div className="radio-container col-md-12">
                <div className="radio">
                  <input type="radio" onChange={this.handleOptionChange} value="On" checked={this.state.selectedOption === 'On'} />
                  <span className="radio-label">On</span>
              </div>
                <div className="radio">
                  <input type="radio" onChange={this.handleOptionChange} value="Off" checked={this.state.selectedOption === 'Off'} />
                  <span className="radio-label">Off</span>
              </div>
              </div>
            </form>
          </div>
        </Card>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps, {})(Preferences);