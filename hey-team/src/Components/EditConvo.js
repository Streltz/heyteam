import React, { Component } from 'react';
import axios from 'axios';
import './EditConvo.css';

class EditConvo extends Component {
  state = {
      Title: '',
      Content: '',
  };

constructor(props) {
    super(props);
    this.processChange = this.processChange.bind(this);
    this.processUpdate = this.processUpdate.bind(this);
  }

  processChange(event) {
    const newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  processUpdate(event) {
    event.preventDefault();
  //  axios.put(`http://localhost:4444/conversation/${this.props.match.params.id}`, this.state).then(() => {
  //    window.location.href = '/';
 //   })
 //   .catch((error) => {
 //     alert('Server error: Please try again later.');
  //  });
  }
  
  componentDidMount() {
  //  axios.get('http://localhost:4444/conversation/').then((response) => {
  //    this.setState(() => response.data.find(convo => convo.id === Number(this.props.match.params.id)));
  //  })
   // .catch((error) => {
   //   alert('Server error: Please try again later.');
   //   window.location.href = '/';
  //  });
  }
  
  render() {
		console.log(this.props);
    return (
				<main id="main-addconvo">
        <Card className="edge-card">
          <div className="card-dashoard">
            <div className="sub-header text-left col-md-12"> Add a New Conversation </div>

            <form onSubmit={e => e.preventDefault()}>
              <input
                className="form-control"
                onChange={this.handleInput}
                name="title"
                type="text"
                value={this.state.title}
                placeholder="Enter Name for this conversation"
              />
              <br />
              <div className="sub-header text-left col-md-12">Schedule</div>
              <div className="days">

                {
                  days.map((day, index) => {
                    return <div key={day} className={this.state.schedule_days.includes(index) ? 'day btn btn-success' : 'day btn btn-secondary'} onClick={() => { this.handleDaySelect(index) }}>{day}</div>
                  })
                }
              </div>
              <br //>
              <div className="sub-header text-left col-md-12">Schedule</div>
              <div className="days">

                {
                  days.map((day, index) => {
                    return <div key={day} className={this.state.schedule_days.includes(index) ? 'day btn btn-success' : 'day btn btn-secondary'} onClick={() => { this.handleDaySelect(index) }}>{day}</div>
                  })
                }
              </div>
              <br /> 
    );
	}
} 


export default EditConvo;
