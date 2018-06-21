import React from 'react';
import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from '../Loading';
import Response from './Response';
import './convo_detail.css';
import { Link } from 'react-router-dom';
import { Card } from 'reactstrap';

class ViewConvo extends React.Component {
  state = {
    redirect: false,
  };

  componentDidMount() {
    // if (this.props.match.params.id === undefined) {
    //   this.setState({ redirect: true });
    // }
  }

  render() {
    console.log('CONVOS view', this.props.convos);
    // const Converter = require('react-showdown').Converter;
    // const converter = new Converter();
    const id = this.props.match.params.id;
    console.log('PARAM ID', id);
    const convo = this.props.convos.find(convo => {
      return convo._id === id;
    });
    console.log('single convo', convo);
    return (
      <div className='view-wrapper'>
          {!this.props.loading ? 
          <div className="viewconvo">
            <div className="participants-edit">
              <div className="part-title">Participants</div>
              <div className="part-edit-delete">
                <Link to="/dashboard/edit">
                  <span className="edit-icon"><i className="material-icons">edit</i></span>
                </Link>
                <div className="delete-convo">
                  <span className="delete-icon"><i className="material-icons">delete</i></span>
                </div>
              </div>
            </div>
                <div className="participants">
                  {
                    convo.participants.map(participant => {
                      return (
                        <div className="participant">img</div>
                      )
                    })
                  }
                </div>
                <br/>
                <div className="q-title">Questions</div>
                <div className="question-box">
                  {
                    convo.questions.map((question, i) => {
                      return (
                        <div className="each-question" key={i}>
                          {i+1}: {question}
                        </div>
                      )
                    })
                  }
                </div>
                <br/>
                <div className="schedule-title">Schedule</div>
                <div className="schedule-time">Mon - Fri at 10:00AM Pacific</div>
                <br/>
                <div className="res-title">Responses</div>
                <div className="response-boxes">
                  {
                    convo.responses.map(response => {
                      return (
                        <Response questions={convo.questions} response={response}/>
                      )
                    })
                  }
                </div>
              </div>
              :
              <div>
                <Loading />
              </div>}
            <div>
              {this.state.redirect ? <Redirect to='/404' /> : null}
            </div>
            <Card/>
          </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('CONVO VIEW STATE', state.convos);
  return {
    convos: state.convos
  }
}

export default connect(mapStateToProps, {})(ViewConvo);