import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './styles.css';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { addConvo } from '../../actions/convoAction';
import { fetchSlackUsers, searchSlackUsers } from '../../actions/userAction';
import { connect } from 'react-redux';

import { Card } from 'reactstrap';

class AddConvo extends Component {
  state = {
    title: '',
    schedule_days: [],
    currentQuestion: '',
    question: '',
    participants: [],
    search: '',
    redirect: false,
    timeDropdownOpen: false,
    zoneDropdownOpen: false,
    ampmDropdownOpen: false,
    selectedTime: 'Select Time',
    selectedZone: 'Time Zone',
    selectedAmpm: 'AM',
    selectedUser: null,
    removeIndex: null,
    addIndex: null,
    removeQuestion: null
  };

  componentDidMount() {
    // fetch all slack users
    this.props.fetchSlackUsers();
  }

  toggle = (type) => {
    if (type === 'time') {
      this.setState({
        timeDropdownOpen: !this.state.timeDropdownOpen
      });
    }

    if (type === 'zone') {
      this.setState({
        zoneDropdownOpen: !this.state.zoneDropdownOpen
      });
    }

    if (type === 'ampm') {
      this.setState({
        ampmDropdownOpen: !this.state.ampmDropdownOpen
      });
    }

  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeQuestion = e => {
    this.setState({ question: e.target.value });
  };

  addQuestion = () => {
    if (this.state.currentQuestion) {
      const questions = this.state.questions;
      questions.push(this.state.currentQuestion);
      this.setState({ currentQuestion: '', questions });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const convo = {};
    convo.title = this.state.title;
    convo.schedule_days = this.state.schedule_days;
    convo.time = this.state.selectedTime;
    convo.timezone = this.state.selectedZone;
    convo.ampm = this.state.selectedAmpm;
    convo.question = this.state.question;
    convo.participants = this.state.participants;
    this.props.addConvo(convo, this.props.history);
  }

  handleDaySelect = (data) => {
    const schedule = this.state.schedule_days;
    const index = this.state.schedule_days.indexOf(data);
    if (index > -1) {
      schedule.splice(index, 1);
    } else {
      schedule.push(data);
      schedule.sort();
    }
    this.setState({ schedule_days: schedule });
    console.log('schedule', this.state.schedule);
  }


  searchUser = (e) => {
    this.setState({ search: e.target.value });
    this.props.searchSlackUsers(e.target.value);
  }

  handleTimeSelect = (data) => {
    this.setState({ selectedTime: data });
  }

  handleZoneSelect = (data) => {
    this.setState({ selectedZone: data });
  }

  handleAmpmSelect = (data) => {
    this.setState({ selectedAmpm: data });
  }

  handleSelectUser = (user) => {
    const addPart = this.state.participants;
    addPart.push(user);
    this.setState({
      search: '',
      participants: addPart,
      addIndex: null
    });
    this.props.searchSlackUsers('');
  }

  handleRemoveUser = (user) => {
    const filtered = this.state.participants.filter(part => {
      if (part.profile.display_name !== user.profile.display_name) {
        return part;
      }
    });
    this.setState({ participants: filtered, removeIndex: null });
  }

  handleRemoveQuestion = (question) => {
    const filtered = this.state.questions.filter(q => {
      if (q !== question) {
        return q;
      }
    });
    this.setState({ questions: filtered, removeQuestion: null });
  }

  render() {
    const fiveUsers = [];
    if (this.props.user.slackUsersMutated.length > 0) {
      for (let i = 0; i < 5; i++) {
        if (this.props.user.slackUsersMutated[i] && !this.state.participants.includes(this.props.user.slackUsersMutated[i])) {
          fiveUsers.push(this.props.user.slackUsersMutated[i]);
        }
      }
    }

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
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
              <br />
              <div className="time">
                <div className='select-time'>
                  <ButtonDropdown isOpen={this.state.timeDropdownOpen} toggle={() => { this.toggle('time') }}>
                    <DropdownToggle color="light" caret>
                      {this.state.selectedTime}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={() => { this.handleTimeSelect('1:00') }}>1:00</DropdownItem>
                      <DropdownItem onClick={() => { this.handleTimeSelect('2:00') }}>2:00</DropdownItem>
                      <DropdownItem onClick={() => { this.handleTimeSelect('3:00') }}>3:00</DropdownItem>
                      <DropdownItem onClick={() => { this.handleTimeSelect('4:00') }}>4:00</DropdownItem>
                      <DropdownItem onClick={() => { this.handleTimeSelect('5:00') }}>5:00</DropdownItem>
                      <DropdownItem onClick={() => { this.handleTimeSelect('6:00') }}>6:00</DropdownItem>
                      <DropdownItem onClick={() => { this.handleTimeSelect('7:00') }}>7:00</DropdownItem>
                      <DropdownItem onClick={() => { this.handleTimeSelect('8:00') }}>8:00</DropdownItem>
                      <DropdownItem onClick={() => { this.handleTimeSelect('9:00') }}>9:00</DropdownItem>
                      <DropdownItem onClick={() => { this.handleTimeSelect('10:00') }}>10:00</DropdownItem>
                      <DropdownItem onClick={() => { this.handleTimeSelect('11:00') }}>11:00</DropdownItem>
                      <DropdownItem onClick={() => { this.handleTimeSelect('12:00') }}>12:00</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </div>

                <div className="select-ampm">
                  <ButtonDropdown isOpen={this.state.ampmDropdownOpen} toggle={() => { this.toggle('ampm') }}>
                    <DropdownToggle color="light" caret>
                      {this.state.selectedAmpm}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={() => { this.handleAmpmSelect('AM') }}>AM</DropdownItem>
                      <DropdownItem onClick={() => { this.handleAmpmSelect('PM') }}>PM</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </div>

                <div className="select-zone">
                  <ButtonDropdown isOpen={this.state.zoneDropdownOpen} toggle={() => { this.toggle('zone') }}>
                    <DropdownToggle color="light" caret>
                      {this.state.selectedZone}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={() => { this.handleZoneSelect('PST') }}>Pacific Standard Time</DropdownItem>
                      <DropdownItem onClick={() => { this.handleZoneSelect('MST') }}>Moutain Standard Time</DropdownItem>
                      <DropdownItem onClick={() => { this.handleZoneSelect('CST') }}>Central Standard Time</DropdownItem>
                      <DropdownItem onClick={() => { this.handleZoneSelect('EST') }}>Eastern Standard Time</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </div>
              </div>

              <br />
              <div className="sub-header text-left col-md-12">Question</div>
              <div className="input-group mb-3">
                <input className="form-control" type='text' onChange={this.onChangeQuestion} value={this.state.question} placeholder="Type a question" />
              </div>
              <br />
              <div className="sub-header text-left col-md-12">Participants</div>
              <div className="display-users">
                {
                  this.state.participants.map((user, i) => {
                    return (
                      <div className="display-user" key={i} onClick={() => { this.handleRemoveUser(user) }} onMouseOver={() => { this.setState({ removeIndex: i }) }} onMouseOut={() => { this.setState({ removeIndex: null }) }}>
                        <div className="display-name">{user.profile.display_name}<span><i className={this.state.removeIndex === i ? "material-icons remove-user" : "material-icons shownone"}>remove_circle</i></span></div>
                      </div>
                    );
                  })
                }
              </div>
              <input className="form-control" type="text" placeholder="search" onChange={this.searchUser} value={this.state.search} />
              <div className="display-users">
                {
                  fiveUsers.map((user, i) => {
                    return (
                      <div className="display-user" key={i} onClick={() => { this.handleSelectUser(user) }} onMouseOver={() => { this.setState({ addIndex: i }) }} onMouseOut={() => { this.setState({ addIndex: null }) }}>
                        <div className="display-name">{user.profile.display_name}<span><i className={this.state.addIndex === i ? "material-icons add-user" : "material-icons shownone"}>add_circle</i></span></div>
                      </div>
                    );
                  })
                }
              </div>
              <br />
              <button
                onClick={this.handleSubmit}
                type="button"
                className='btn btn-primary'>
                Add Conversation
          </button><br />
            </form>
            {this.state.redirect && <Redirect to={'/'} />}
          </div>
        </Card>
      </main>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    convos: state.convos,
    user: state.user
  }
}

export default connect(mapStateToProps, { addConvo, fetchSlackUsers, searchSlackUsers })(AddConvo);