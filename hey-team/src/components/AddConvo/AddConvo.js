import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './AddConvo.css';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { addConvo } from '../../actions/convoAction';
import { connect } from 'react-redux';

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
      zoneDropdownOpen: false,
      ampmDropdownOpen: false,
      selectedTime: 'Select Time',
      selectedZone: 'Time Zone',
      selectedAmpm: 'AM'
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

    if(type === 'ampm'){
      this.setState({
        ampmDropdownOpen: !this.state.ampmDropdownOpen
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
      e.preventDefault();
      const convo = {};
      convo.title = this.state.title;
      convo.schedule = this.state.schedule;
      convo.time = this.state.selectedTime;
      convo.timezone = this.state.selectedZone;
      convo.ampm = this.state.selectedAmpm;
      convo.questions = this.state.questions;
      convo.participants = this.state.participants;
      this.props.addConvo(convo, this.props.history);
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

  handleTimeSelect = (data) => {
    this.setState({selectedTime: data});
  }

  handleZoneSelect = (data) => {
    this.setState({selectedZone: data});
  }

    handleAmpmSelect = (data) => {
    this.setState({selectedAmpm: data});
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
            <div className='select-time'>
              <ButtonDropdown isOpen={this.state.timeDropdownOpen} toggle={()=>{this.toggle('time')}}>
                <DropdownToggle color="light" caret>
                  {this.state.selectedTime}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={()=>{this.handleTimeSelect('1:00')}}>1:00</DropdownItem>
                  <DropdownItem onClick={()=>{this.handleTimeSelect('2:00')}}>2:00</DropdownItem>
                  <DropdownItem onClick={()=>{this.handleTimeSelect('3:00')}}>3:00</DropdownItem>
                  <DropdownItem onClick={()=>{this.handleTimeSelect('4:00')}}>4:00</DropdownItem>
                  <DropdownItem onClick={()=>{this.handleTimeSelect('5:00')}}>5:00</DropdownItem>
                  <DropdownItem onClick={()=>{this.handleTimeSelect('6:00')}}>6:00</DropdownItem>
                  <DropdownItem onClick={()=>{this.handleTimeSelect('7:00')}}>7:00</DropdownItem>
                  <DropdownItem onClick={()=>{this.handleTimeSelect('8:00')}}>8:00</DropdownItem>
                  <DropdownItem onClick={()=>{this.handleTimeSelect('9:00')}}>9:00</DropdownItem>
                  <DropdownItem onClick={()=>{this.handleTimeSelect('10:00')}}>10:00</DropdownItem>
                  <DropdownItem onClick={()=>{this.handleTimeSelect('11:00')}}>11:00</DropdownItem>
                  <DropdownItem onClick={()=>{this.handleTimeSelect('12:00')}}>12:00</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </div>

            <div className="select-ampm">
              <ButtonDropdown isOpen={this.state.ampmDropdownOpen} toggle={()=>{this.toggle('ampm')}}>
                <DropdownToggle color="light"  caret>
                  {this.state.selectedAmpm}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={()=>{this.handleAmpmSelect('AM')}}>AM</DropdownItem>
                  <DropdownItem onClick={()=>{this.handleAmpmSelect('PM')}}>PM</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </div>

            <div className="select-zone">
              <ButtonDropdown isOpen={this.state.zoneDropdownOpen} toggle={()=>{this.toggle('zone')}}>
                <DropdownToggle color="light"  caret>
                  {this.state.selectedZone}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={()=>{this.handleZoneSelect('PST')}}>Pacific Standard Time</DropdownItem>
                  <DropdownItem onClick={()=>{this.handleZoneSelect('MST')}}>Moutain Standard Time</DropdownItem>
                  <DropdownItem onClick={()=>{this.handleZoneSelect('CST')}}>Central Standard Time</DropdownItem>
                  <DropdownItem onClick={()=>{this.handleZoneSelect('EST')}}>Eastern Standard Time</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </div>
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

const mapStateToProps = (state) => {
  return {
    convos: state.convos
  }
}

export default connect(mapStateToProps, { addConvo })(AddConvo);