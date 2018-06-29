import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'reactstrap';
import axios from 'axios';
import './styles.css';
const ROOT_URL = 'http://localhost:5000' || 'https://mysterious-coast-15187.herokuapp.com';
class Preferences extends React.Component {

  state = {
    selectedOption: 'On'
  }

  handleOptionChange = (event) => {
    this.setState({
      selectedOption: event.target.value
    });

    axios.post(`${ROOT_URL}/preference`, {pref: event.target.value}, {headers: {token: localStorage.getItem('token')}})
      .then(res => {
        console.log('Preference changed');
    });
  }

  render() {
    return (
      <main id="main-preferences">
        <Card className="edge-card">
          <div id="card-pref" className="text-left">
            <div className="logo">Preferences</div>
            <br />
            
            <h2 className="detail-header">Email Summary</h2>
            <form className="form-group">
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