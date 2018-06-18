import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './AddConvo.css';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class AddConvo extends Component {
  state = {
      title: '',
      schedule: [],
      currentQuestion: '',
      questions: ['test question'],
      participants: ['User1', 'User2'],
      search: '',
      redirect: false,
      timeDropdownOpen: false,
      zoneDropdownOpen: false
  };

  toggle = (type)=>{
    if(type === 'time'){
      this.setState({
      timeDropdownOpen: !this.state.timeDropdownOpen
    });
    }
    if(type === 'zone'){
      this.setState({
      zoneDropdownOpen: !this.state.zoneDropdownOpen
    });
    }
    
  }

  handleInput = e => {
      this.setState({ [e.target.name]: e.target.value });
  };

  onChangeQuestion = e => {
      this.setState({ currentQuestion: e.target.value });
  };

  addQuestion = () => {
    if(this.state.currentQuestion){
      const questions = this.state.questions;
      questions.push(this.state.currentQuestion);
      this.setState({currentQuestion: '', questions});
    }
  }

  handleSubmit = e => {
      // e.preventDefault();
      // axios.post('http://localhost:4444/convos/', this.state).then(() => {
      // window.location.href = '/';
      // })
      // .catch((error) => {
      //     throw error;
      // });
  }
  handleDaySelect = (data) => {
    const schedule = this.state.schedule;
    const index = this.state.schedule.indexOf(data);
    if(index > -1){
      schedule.splice(index, 1);
    }else{
      schedule.push(data);
      schedule.sort();
    }
    this.setState({schedule});
    console.log('schedule', this.state.schedule);
  }


  searchUser = (e) => {
    this.setState({search: e.target.value});
    //TODO use slack API to search for user on input change
  }

  render() {
    const days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
    return(

      <div className="new-convo">
        <h3> Add a New Conversation </h3>
        <form onSubmit={e => e.preventDefault()}>
          <input 
            className="form-control"
            onChange={this.handleInput}
            name="title"
            type="text"
            value={this.state.title}
            placeholder="Enter Name for this conversation"
          />
          <h3>Schedule</h3>
          <div className="days">

            {
              days.map((day, index) => {
                return <div key={day} className={this.state.schedule.includes(index) ? 'day btn btn-success' : 'day btn btn-secondary'} onClick={()=>{this.handleDaySelect(index)}}>{day}</div>
              })
            }
          </div>
          <br/>
          <div className="time">

            <ButtonDropdown isOpen={this.state.timeDropdownOpen} toggle={()=>{this.toggle('time')}}>
              <DropdownToggle caret>
                Select Time
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>12:00 AM</DropdownItem>
                <DropdownItem>1:00 AM</DropdownItem>
                <DropdownItem>2:00 AM</DropdownItem>
                <DropdownItem>3:00 AM</DropdownItem>
                <DropdownItem>4:00 AM</DropdownItem>
                <DropdownItem>5:00 AM</DropdownItem>
                <DropdownItem>6:00 AM</DropdownItem>
                <DropdownItem>7:00 AM</DropdownItem>
                <DropdownItem>8:00 AM</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>


            <ButtonDropdown isOpen={this.state.zoneDropdownOpen} toggle={()=>{this.toggle('zone')}}>
              <DropdownToggle caret>
                TimeZone
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>PST</DropdownItem>
                <DropdownItem>CST</DropdownItem>
                <DropdownItem>MST</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>

            <div>TimeZone (Select)</div>
          </div>

          <br/>
          <h3>Questions</h3>
          {
            this.state.questions.map((question, index) => {
              return <div key={index}>{index+1}: {question}</div>
            })
          }

          <div className="input-group mb-3">
          <input className="form-control" type='text' onChange={this.onChangeQuestion} value={this.state.currentQuestion} placeholder="Type a question" />
          <button className="add-question btn btn-secondary" onClick={()=>{this.addQuestion()}}>+</button>
          </div>
          
          <h3>Participants</h3>
          <input className="form-control" type="text" placeholder="search" onChange={this.searchUser} value={this.state.search} />

          <br/>
          <button
            onClick={this.handleSubmit}
            type="button"
            className='btn btn-primary'>
            Add Conversation
          </button><br/>
        </form>
        {this.state.redirect && <Redirect to={'/'} />}
          
      </div>
    );
  };
};


export default AddConvo;